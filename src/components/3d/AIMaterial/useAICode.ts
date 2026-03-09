import { create } from "zustand";
export const tempplate = `
const material = new THREE.MeshPhysicalNodeMaterial({})

const waveNoise = vec3(
    sin(positionLocal.y.mul(10).add(sin(time).mul(5))),
    positionLocal.y.mul(2),
    cos(positionLocal.y.mul(10).add(sin(time).mul(5)))
).normalize();

material.transmissionNode = float(0.0);

material.roughnessNode = float(0.15);
material.metalnessNode = float(0.95);

material.thicknessNode = float(1.5).add(sin(time.add(positionLocal.length()))); 
material.positionNode = positionLocal.add(waveNoise);

const goldenColor = color('rgba(255, 255, 255, 1)');
material.colorNode = vec4(goldenColor).mul(float(1.0)).add(vec4(0.3));

const geometry = new THREE.SphereGeometry(1,256,256);
const mesh = new THREE.Mesh(geometry, material);

return mesh;
`;

// if (import.meta.env.DEV) {
//   if (typeof window !== "undefined") {
//     localStorage.clear();
//   }
// }

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
