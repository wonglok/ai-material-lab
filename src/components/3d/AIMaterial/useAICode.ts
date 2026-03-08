import { create } from "zustand";

export const useAICode = create<any>((set, get) => {
  return {
    //
    prompt: `const material = new THREE.MeshPhysicalNodeMaterial({})

material.transmissionNode = float(1.0);
material.thicknessNode = float(1.5).add(sin(time.add(positionLocal.length()))); 

material.roughnessNode = float(0.1);
material.metalnessNode = float(0.2);

const noise = vec3(
        sin(positionLocal.y.mul(10).add(sin(time).add(time))),
        positionLocal.y.mul(2),
        cos(positionLocal.y.mul(10).add(sin(time).add(time))),
    );

material.positionNode = positionLocal.add(
    noise
);

// make it rainbow colored aligned to the swirl
// todo: change this line:
material.colorNode = color( new Color(  'rgba(255, 255, 255, 1)' ) )

return material;
    `.trim(),
    isRunning: false,
    ctxSize: 256_000,
    modelId: `qwen3.5-4b`,
    draft: `
    `.trim(),
    code: `
const material = new THREE.MeshPhysicalNodeMaterial({})

material.transmissionNode = float(1.0);
material.thicknessNode = float(1.5).add(sin(time.add(positionLocal.length()))); 

material.roughnessNode = float(0.1);
material.metalnessNode = float(0.2);

const noise = vec3(
        sin(positionLocal.y.mul(10).add(sin(time).add(time))),
        positionLocal.y.mul(2),
        cos(positionLocal.y.mul(10).add(sin(time).add(time))),
    );

material.positionNode = positionLocal.add(
    noise
);

// make it rainbow colored aligned to the swirl
// todo: change this line:
material.colorNode = color( new Color(  'rgba(255, 255, 255, 1)' ) )

return material;
`.trim(),
  };
});
