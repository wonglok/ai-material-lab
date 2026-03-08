import { create } from "zustand";

export const useAICode = create<any>((set, get) => {
  return {
    //
    prompt: `const material = new THREE.MeshPhysicalNodeMaterial({})

material.colorNode = uniform( new Color(  'rgba(236, 90, 90, 1)' ) );

material.transmissionNode = float(1.0);
material.thicknessNode = float(1.5); 

material.roughnessNode = float(0.0);
material.metalnessNode = float(0.0);

const wobbleFreq = float( 2.0 );
const wobbleAmp = float( 0.15 );

material.positionNode = vec3(positionLocal)
    .mul(
        vec3(
            1.0, 
            2.0, 
            1.0
        )
    )
    .add(
        vec3(
            sin(time.add(positionLocal.y.mul(Math.PI * 1.5))),
            0.0,
            cos(time.add(positionLocal.y.mul(Math.PI * 1.5))),
        )
    )

return material;
    `.trim(),
    draft: `const material = new THREE.MeshPhysicalNodeMaterial({})

material.colorNode = uniform( new Color(  'rgba(236, 90, 90, 1)' ) );

material.transmissionNode = float(1.0);
material.thicknessNode = float(1.5); 

material.roughnessNode = float(0.0);
material.metalnessNode = float(0.0);

const wobbleFreq = float( 2.0 );
const wobbleAmp = float( 0.15 );

material.positionNode = vec3(positionLocal)
    .mul(
        vec3(
            1.0, 
            2.0, 
            1.0
        )
    )
    .add(
        vec3(
            sin(time.add(positionLocal.y.mul(Math.PI * 1.5))),
            0.0,
            cos(time.add(positionLocal.y.mul(Math.PI * 1.5))),
        )
    )

return material;
    `.trim(),
    code: `const material = new THREE.MeshPhysicalNodeMaterial({})

material.colorNode = uniform( new Color(  'rgba(236, 90, 90, 1)' ) );

material.transmissionNode = float(1.0);
material.thicknessNode = float(1.5); 

material.roughnessNode = float(0.0);
material.metalnessNode = float(0.0);

const wobbleFreq = float( 2.0 );
const wobbleAmp = float( 0.15 );

material.positionNode = vec3(positionLocal)
    .mul(
        vec3(
            1.0, 
            2.0, 
            1.0
        )
    )
    .add(
        vec3(
            sin(time.add(positionLocal.y.mul(Math.PI * 1.5))),
            0.0,
            cos(time.add(positionLocal.y.mul(Math.PI * 1.5))),
        )
    )

return material;
`.trim(),
  };
});
