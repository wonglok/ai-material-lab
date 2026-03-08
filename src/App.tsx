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
      <div className="w-full flex h-2/3  bg-[#84d1a1] p-1">
        <div className="h-full w-1/2 pr-1">
          <CanvasGPU>
            <Sphere args={[1, 128, 128]}>
              <AIGlassMaterial></AIGlassMaterial>
            </Sphere>
            <OrbitControls></OrbitControls>
            <BloomPipeline url={`/hdr/default.hdr`}></BloomPipeline>
          </CanvasGPU>
        </div>
        <div className="h-full w-1/2">
          <AICode></AICode>
        </div>
      </div>
      <div className="w-full h-1/3 flex  bg-[#84d1a1]">
        <div className="w-1/2 h-full pr-1">
          <AIPrompt></AIPrompt>
        </div>
        <div className="w-1/2 h-full ">
          <AIDraft></AIDraft>
        </div>
      </div>
      <Toaster></Toaster>
    </>
  );
}

export default App;
