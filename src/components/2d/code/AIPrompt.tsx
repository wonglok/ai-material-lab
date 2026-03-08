import { useEffect, useState } from "react";
import { useAICode } from "../../3d/AIMaterial/useAICode";
import { toast } from "sonner";
import { Editor } from "@monaco-editor/react";
import OpenAI from "openai";
import TSLSystem from "../../3d/prompts/TSLSystem.txt?raw";

export function AIPrompt() {
  const prompt = useAICode((r) => r.prompt);
  const [editor, setEditor] = useState<any>(null);
  useEffect(() => {
    let val = localStorage.getItem("prompt");
    if (val && typeof val === "string") {
      useAICode.setState({ prompt: val });
    }
  }, []);

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
          <button
            className="p-3 bg-[#71d854] m-3"
            onClick={async (ev: any) => {
              ev.disabled = true;
              ev.target.innerText = "Processing Prompt...";
              //
              function removeThinkingTag(text: string) {
                // The regex pattern matches the <think> tag, any content (.*?),
                // and the </think> tag across multiple lines (s flag).
                const regex = /<think>.*?<\/think>/gs;
                return text.replace(regex, "").trim();
              }

              const client = new OpenAI({
                apiKey: "n/a", // This is the default and can be omitted
                baseURL: `http://localhost:1234/v1`,
                dangerouslyAllowBrowser: true,
              });

              const resp = await client.chat.completions.create({
                reasoning_effort: "xhigh",
                messages: [
                  { role: "system", content: `${TSLSystem}` },
                  { role: "user", content: prompt },
                ],
                model: `qwen3.5-4b`,
                stream: true,
                temperature: 0.0,
              });

              let tx = "";
              for await (let evt of resp) {
                tx += evt.choices[0].delta.content || "";
                useAICode.setState({
                  draft: `${removeThinkingTag(`${tx}`)}`,
                  draftBottom: Math.random(),
                });
                ev.target.innerText = "Generating...";
              }
              useAICode.setState({
                draft: `${removeThinkingTag(`${tx}`)}`,
                code: `${removeThinkingTag(`${tx}`)}`,
              });

              ev.target.innerText = "Submit Prompt";
              ev.disabled = false;
            }}
          >
            Submit Prompt
          </button>
        )}
      </div>
    </div>
  );
}
