import "./App.css";

import { OrbitControls, Sphere } from "@react-three/drei";
import { CanvasGPU } from "./components/3d/CanvasGPU/CanvasGPU";
import { BloomPipeline } from "./components/3d/CanvasGPU/BloomPipeline";
import { AIGlassMaterial } from "./components/3d/AIMaterial/Glass/AIGlassMaterial";
import { Toaster } from "sonner";
import { AIPrompt } from "./components/2d/code/AIPrompt";
import { AIDraft } from "./components/2d/code/AIDraft";
import { AICode } from "./components/2d/code/AICode";

function App() {
  return (
    <>
      <div className="w-full flex h-1/2  bg-[#b6edff] p-1">
        <div className="h-full w-1/2 pr-1">
          <div
            className="flex items-center justify-center text-[#040a7a]"
            style={{ height: "30px" }}
          >
            3D Viewer
          </div>
          <div className="" style={{ height: `calc(100% - 30px)` }}>
            <CanvasGPU>
              <Sphere args={[1, 128, 128]}>
                <AIGlassMaterial></AIGlassMaterial>
              </Sphere>
              <OrbitControls></OrbitControls>
              <BloomPipeline url={`/hdr/default.hdr`}></BloomPipeline>
            </CanvasGPU>
          </div>
        </div>
        <div className="h-full w-1/2">
          <div
            style={{ height: "30px" }}
            className="flex items-center justify-center text-[#040a7a]"
          >
            Editor for 3D Code
          </div>
          <div style={{ height: `calc(100% - 30px)` }}>
            <AICode></AICode>
          </div>
        </div>
      </div>
      <div className="w-full h-1/2 flex  bg-[#070e88] p-1">
        <div className="w-1/2 h-full pr-1">
          <div
            style={{ height: "30px" }}
            className="flex items-center justify-center text-[#ebc275] "
          >
            AI Prompt
          </div>
          <div style={{ height: `calc(100% - 30px)` }}>
            <AIPrompt></AIPrompt>
          </div>
        </div>
        <div className="w-1/2 h-full ">
          <div
            style={{ height: "30px" }}
            className="flex items-center justify-center text-[#ebc275] "
          >
            AI Generated Code (readonly)
          </div>
          <div style={{ height: `calc(100% - 30px)` }}>
            <AIDraft></AIDraft>
          </div>
        </div>
      </div>

      <Toaster></Toaster>
    </>
  );
}

export default App;
