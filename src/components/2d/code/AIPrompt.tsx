import { useEffect, useState } from "react";
import { useAICode } from "../../3d/AIMaterial/useAICode";
import { toast } from "sonner";
import { Editor } from "@monaco-editor/react";
import OpenAI from "openai";
import TSLSystem from "../../3d/prompts/TSLSystem.txt?raw";

export function AIPrompt() {
  const prompt = useAICode((r) => r.prompt);
  const isAIRunning = useAICode((r) => r.isAIRunning);
  const ctxSize = useAICode((r) => r.ctxSize);
  const modelId = useAICode((r) => r.modelId);
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    let val = localStorage.getItem("prompt");
    if (val && typeof val === "string") {
      useAICode.setState({ prompt: val });
    }
  }, []);

  //

  return (
    <div
      className="w-full h-full relative "
      onKeyDownCapture={(ev) => {
        if ((ev.metaKey || ev.ctrlKey) && ev.key === "s") {
          ev.preventDefault();
          ev.stopPropagation();

          toast("Your prompt is saved");
        }
      }}
    >
      <div className=" absolute top-0 left-0 w-full h-full">
        <Editor
          theme="vs-dark"
          value={prompt}
          language="javascript"
          onChange={(ev) => {
            let val = ev;
            localStorage.setItem("prompt", val!);
            useAICode.setState({ prompt: val });
          }}
          onMount={(editor, monaco) => {
            setEditor(editor);
          }}
        ></Editor>
      </div>
      <div className=" absolute top-0 right-0 z-10">
        {editor && (
          <>
            <div className="m-3 bg-[#ffffff]">
              <div className="px-3 border-b py-2">Model</div>
              <select
                className="px-3 py-3"
                defaultValue={modelId}
                onChange={(ev) => {
                  useAICode.setState({
                    modelId: ev.target.value,
                  });
                }}
              >
                <option key="k0" value={"qwen3.5-4b"}>{`qwen3.5-4b`}</option>
                <option key="k1" value={"qwen3.5-9b"}>{`qwen3.5-9b`}</option>
                <option
                  key="k2"
                  value={"qwen3.5-35b-a3b"}
                >{`qwen3.5-35b-a3b`}</option>
              </select>
            </div>
            <div className="m-3 bg-[#ffffff]">
              <div className="px-3 border-b py-2">Context Window Size</div>
              <input
                className="p-3 bg-[#ffffff]"
                value={ctxSize}
                onChange={(ev) => {
                  useAICode.setState({
                    ctxSize: ev.target.value,
                  });
                }}
              ></input>
            </div>
            <button
              className="p-3 bg-[#71d854] mx-3"
              disabled={isAIRunning}
              onClick={async (ev: any) => {
                toast("begin generating code");
                //
                function removeThinkingTag(text: string) {
                  // The regex pattern matches the <think> tag, any content (.*?),
                  // and the </think> tag across multiple lines (s flag).
                  const regex = /<think>.*?<\/think>/gs;
                  return text.replace(regex, "").trim();
                }

                const headers: HeadersInit = {
                  "Content-Type": "application/json",
                };
                headers["Authorization"] = `Bearer N/A`;

                await fetch(`http://localhost:1234/api/v1/models/unload`, {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify({
                    instance_id: modelId,
                  }),
                }).catch((r) => {});

                await fetch(`http://localhost:1234/api/v1/models/load`, {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify({
                    model: modelId,
                    context_length: ctxSize,
                  }),
                });

                useAICode.setState({ isAIRunning: true });

                const client = new OpenAI({
                  apiKey: "n/a", // This is the default and can be omitted
                  baseURL: `http://localhost:1234/v1`,
                  dangerouslyAllowBrowser: true,
                });

                const resp = await client.chat.completions.create({
                  reasoning_effort: "high",
                  messages: [
                    { role: "system", content: `${TSLSystem}` },
                    { role: "user", content: prompt },
                  ],
                  model: modelId,
                  stream: true,
                  temperature: 0,
                });

                let tx = "";
                for await (let evt of resp) {
                  tx += evt.choices[0].delta.content || "";
                  useAICode.setState({
                    draft: `${removeThinkingTag(`${tx}`)}`,
                    draftBottom: Math.random(),
                  });
                }
                useAICode.setState({
                  draft: `${removeThinkingTag(`${tx}`)}`,
                  code: `${removeThinkingTag(`${tx}`)}`,
                  isAIRunning: false,
                });
              }}
            >
              {isAIRunning ? `Generating...` : `Submit Prompt`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
