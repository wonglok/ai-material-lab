import { create } from "zustand";

export const useAICode = create<any>((set, get) => {
  return {
    //
    prompt: `
const material = new THREE.MeshPhysicalNodeMaterial({})

material.colorNode = color( new Color(  'rgba(255, 255, 255, 1)' ) );

material.transmissionNode = float(1.0);
material.thicknessNode = float(1.5); 

material.roughnessNode = float(0.0);
material.metalnessNode = float(0.0);

// i want to have bouncing wobble blob in rainbow color

return material;
    `.trim(),
    isRunning: false,
    draft: `
    `.trim(),
    code: `

const material = new THREE.MeshPhysicalNodeMaterial({})

material.colorNode = color( new Color(  'rgba(255, 255, 255, 1)' ) );

material.transmissionNode = float(1.0);
material.thicknessNode = float(1.5); 

material.roughnessNode = float(0.0);
material.metalnessNode = float(0.0);

// i want to have bouncing wobble blob in rainbow color

return material;
`.trim(),
  };
});
