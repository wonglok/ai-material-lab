import { create } from "zustand";
const tempplate = `const material = new THREE.MeshPhysicalNodeMaterial({})

// Create water-like noise pattern with time variation
const waveNoise = vec3(
    sin(positionLocal.y.mul(10).add(sin(time).mul(5))),
    positionLocal.y.mul(2),
    cos(positionLocal.y.mul(10).add(sin(time).mul(5)))
).normalize();


material.transmissionNode = float(1.0);

material.roughnessNode = float(0.1);
material.metalnessNode = float(0.2);

material.thicknessNode = float(1.5).add(sin(time.add(positionLocal.length()))); 
material.positionNode = positionLocal.add(waveNoise);

// Make it blue and water-ish with wavy variation based on noise above, change with sin(time)
const baseColor = color('rgba(39, 98, 247, 1)'); // Blue water color
material.colorNode = vec4(baseColor).mul(float(1.0)).add(vec4(0.5));

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
