import { useMemo } from "react";
import * as TSL from "three/tsl";
import { useAICode } from "../useAICode";
import * as THREE from "three/webgpu";

export function AIGlassMaterial({
  onOK = (_: any) => {},
  onError = (_: any) => {},
}) {
  const code = useAICode((r) => r.code);

  const key = useMemo(() => {
    return `_${Math.random().toString(36).slice(2, 9)}`;
  }, []);

  const materialNode = useMemo(() => {
    let defaultNode = new THREE.MeshBasicNodeMaterial({});
    let currentNode: any = defaultNode;

    try {
      let vals = Object.values(TSL);
      let fnc = new Function(
        ...Object.keys(TSL),
        ...Object.keys(THREE),
        "THREE",
        `
      ${code}
      `,
      );

      let value = fnc(...vals, ...Object.values(THREE), THREE);
      if (value instanceof THREE.NodeMaterial) {
        currentNode = value;
        onOK(value);
      }
    } catch (e) {
      console.error(e);
      onError(JSON.stringify(e));
    }

    return <primitive object={currentNode}></primitive>;

    //
  }, [key, code]);

  return <>{materialNode}</>;
}
