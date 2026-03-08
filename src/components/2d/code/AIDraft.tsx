import { useEffect, useState } from "react";
import { useAICode } from "../../3d/AIMaterial/useAICode";
import { toast } from "sonner";
import { Editor } from "@monaco-editor/react";

export function AIDraft() {
  const draft = useAICode((r) => r.draft);
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    let val = localStorage.getItem("draft");
    if (val && typeof val === "string") {
      useAICode.setState({ draft: val });
    }
  }, []);

  useEffect(() => {
    if (!editor) {
      return;
    }
    return useAICode.subscribe((now, before) => {
      if (now.draftBottom !== before.draftBottom) {
        editor.revealLineInCenter(now.draft.split("\n").length / 2);
      }
    });
  }, [editor]);

  return (
    <div
      className="w-full h-full relative "
      onKeyDownCapture={(ev) => {
        if ((ev.metaKey || ev.ctrlKey) && ev.key === "s") {
          ev.preventDefault();
          ev.stopPropagation();

          localStorage.setItem("draft", draft);
          toast("Your draft is saved");
        }
      }}
    >
      <div className=" absolute top-0 left-0 w-full h-full">
        <Editor
          onMount={(editor) => {
            setEditor(editor);
          }}
          theme="vs-dark"
          value={draft}
          language="javascript"
          onChange={(val) => {
            localStorage.setItem("draft", val!);
            useAICode.setState({ draft: val });
          }}
        ></Editor>
      </div>
      <div className=" absolute top-0 right-0 z-10">
        <button
          className="p-3 bg-white m-3"
          onClick={() => {
            localStorage.setItem("draft", draft);
            toast("Your draft is saved");
            useAICode.setState({ code: draft });
          }}
        >
          Preview
        </button>
      </div>
    </div>
  );
}
