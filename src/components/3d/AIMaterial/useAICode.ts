import { create } from "zustand";

export const useAICode = create<any>((set, get) => {
  return {
    //
    prompt: `// please help me to change the following code to wobble blob

const material = new THREE.MeshPhysicalNodeMaterial({})

material.colorNode = color( new Color(  'rgba(255, 255, 255, 1)' ) );

material.transmissionNode = float(1.0);
material.thicknessNode = float(1.5).add(sin(time.add(positionLocal.length()))); 

material.roughnessNode = float(0.0);
material.metalnessNode = float(0.0);

material.positionNode = positionLocal.add(
    vec3(
        sin(positionLocal.x)
    )
);

return material;
    `.trim(),
    isRunning: false,
    ctxSize: 128_000,
    modelId: `qwen3.5-9b`,
    draft: `
    `.trim(),
    code: `
const material = new THREE.MeshPhysicalNodeMaterial({})

material.colorNode = color( new Color(  'rgba(255, 255, 255, 1)' ) );

material.transmissionNode = float(1.0);
material.thicknessNode = float(1.0).add(sin(time.add(positionLocal.length()))); 

material.roughnessNode = float(0.0);
material.metalnessNode = float(0.0);

return material;
`.trim(),
  };
});
