import { create } from "zustand";

export const useAICode = create<any>((set, get) => {
  return {
    //
    prompt: `const material = new THREE.MeshPhysicalNodeMaterial({})

material.transmissionNode = float(1.0);
material.thicknessNode = float(1.5).add(sin(time.add(positionLocal.length()))); 

material.roughnessNode = float(0.0);
material.metalnessNode = float(0.0);

material.positionNode = positionLocal.add(
    vec3(
        sin(positionLocal.y.mul(10).add(time)),
        positionLocal.y.mul(2),
        cos(positionLocal.y.mul(10).add(time)),
    )
);

// make it rainbow colored aligned to the swirl
material.colorNode = color( new Color(  'rgba(255, 255, 255, 1)' ) );

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

material.roughnessNode = float(0.0);
material.metalnessNode = float(0.0);

material.positionNode = positionLocal.add(
    vec3(
        sin(positionLocal.y.mul(10).add(time)),
        positionLocal.y.mul(2),
        cos(positionLocal.y.mul(10).add(time)),
    )
);

// make it rainbow colored
material.colorNode = color( new Color(  'rgba(255, 255, 255, 1)' ) );

return material;
`.trim(),
  };
});
