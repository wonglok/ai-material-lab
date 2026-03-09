import { useEffect } from "react";
import { toast } from "sonner";
import { Editor } from "@monaco-editor/react";
import { useAICode } from "../../3d/AIMaterial/useAICode";

export function AICode() {
  const code = useAICode((r) => r.code);

  useEffect(() => {
    let val = localStorage.getItem("code");
    if (val && typeof val === "string") {
      useAICode.setState({ code: val });
    }
  }, []);

  return (
    <div
      className="w-full h-full relative "
      onKeyDownCapture={(ev) => {
        if ((ev.metaKey || ev.ctrlKey) && ev.key === "s") {
          ev.preventDefault();
          ev.stopPropagation();

          localStorage.setItem("code", code);
          toast("Your code is saved");
        }
      }}
    >
      <div className=" absolute top-0 left-0 w-full h-full">
        <Editor
          theme="vs-dark"
          value={code.trim()}
          language="javascript"
          onChange={(val) => {
            localStorage.setItem("code", val!);
            useAICode.setState({ code: val });
          }}
        ></Editor>
      </div>
      <div className=" absolute top-0 right-0 z-10">
        <button
          className="p-3 bg-white m-3"
          onClick={() => {
            useAICode.setState({ code: code + " " });
            toast("Your code is saved");
          }}
        >
          Run the code
        </button>
      </div>
    </div>
  );
}
