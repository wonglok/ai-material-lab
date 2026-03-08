import { create } from "zustand";

export const useAICode = create<any>((set, get) => {
  return {
    //
    prompt: `
const material = new THREE.MeshPhysicalNodeMaterial({});

// i want to make a wobble blob with perlin noise.

return material;
    `.trim(),
    isRunning: false,
    draft: `
    `.trim(),
    code: `const material = new THREE.MeshPhysicalNodeMaterial({})

material.colorNode = uniform( new Color(  'rgba(236, 90, 90, 1)' ) );

material.transmissionNode = float(1.0);
material.thicknessNode = float(1.5); 

material.roughnessNode = float(0.0);
material.metalnessNode = float(0.0);

return material;
`.trim(),
  };
});
