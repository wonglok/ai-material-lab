import { useEffect, useState } from "react";
import { useAICode } from "../../3d/AIMaterial/useAICode";
import { toast } from "sonner";
import { Editor } from "@monaco-editor/react";

export function AIDraft() {
  const draft = useAICode((r) => r.draft);
  const [editor, setEditor] = useState<any>(null);

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
        }
      }}
    >
      <div className=" absolute top-0 left-0 w-full h-full">
        <Editor
          onMount={(editor) => {
            setEditor(editor);
            editor.updateOptions({ readOnly: true });
          }}
          theme="vs-dark"
          value={draft}
          language="javascript"
        ></Editor>
      </div>
    </div>
  );
}
