import { useMemo } from "react";
import * as TSL from "three/tsl";
import { useAICode } from "../useAICode";
import * as THREE from "three/webgpu";
import * as Textrues from "tsl-textures";

export function AIGlassMaterial({
  onOK = (_?: any) => {},
  onError = (_: any) => {},
}) {
  const code = useAICode((r) => r.code);

  const key = useMemo(() => {
    return `_${Math.random().toString(36).slice(2, 9)}`;
  }, []);

  const materialNode = useMemo(() => {
    let defaultNode = new THREE.Group();
    let currentNode: any = defaultNode;

    try {
      let vals = Object.values(TSL);
      let fnc = new Function(
        ...Object.keys(TSL),
        ...Object.keys(THREE),
        "THREE",
        ...Object.keys(Textrues),
        `
      ${code}
      `,
      );

      let value = fnc(
        ...vals,
        ...Object.values(THREE),
        THREE,
        ...Object.values(Textrues),
      );
      if (value instanceof THREE.Object3D) {
        currentNode = value;
        onOK();
      } else {
        throw new Error("failed");
      }
    } catch (e) {
      console.error(e);
      onError("Failed to compile code");
    }

    return <primitive object={currentNode}></primitive>;

    //
  }, [key, code]);

  return <>{materialNode}</>;
}
