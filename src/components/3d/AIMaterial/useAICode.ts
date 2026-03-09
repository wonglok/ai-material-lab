import { create } from "zustand";
const tempplate = `const material = new THREE.MeshPhysicalNodeMaterial({})

material.transmissionNode = float(1.0);

material.roughnessNode = float(0.1);
material.metalnessNode = float(0.2);

const noise = vec3(
    sin(positionLocal.y.mul(10).add(sin(time).add(time))),
    positionLocal.y.mul(2),
    cos(positionLocal.y.mul(10).add(sin(time).add(time))),
).normalize();

material.thicknessNode = float(1.5).add(sin(time.add(positionLocal.length()))); 

material.positionNode = positionLocal.add(
    noise
);

// make it blue and water-ish and wavy based on noise above
material.colorNode = vec4(1.0);

return material;`;

export const useAICode = create<any>((set, get) => {
  return {
    //
    prompt: `${tempplate}
    `.trim(),
    isRunning: false,
    ctxSize: 128_000,
    modelId: `qwen3.5-4b`,
    draft: `
    `.trim(),
    code: `
${tempplate}
`.trim(),
  };
});
