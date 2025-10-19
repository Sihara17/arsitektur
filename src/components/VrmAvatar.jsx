// src/components/VrmAvatar.jsx
import { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export default function VrmAvatar({ url, mouthOpen = 0 }) {
  const group = useRef();
  const vrmRef = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load(url, (gltf) => {
      const vrm = gltf.userData.vrm;
      VRMUtils.removeUnnecessaryJoints(vrm.scene);
      vrm.scene.rotation.y = Math.PI;
      group.current.add(vrm.scene);
      vrmRef.current = vrm;
    });
  }, [url]);

  useFrame(() => {
    if (!vrmRef.current) return;
    const vrm = vrmRef.current;
    const blendShapeProxy = vrm.blendShapeProxy;

    if (blendShapeProxy) {
      blendShapeProxy.setValue("A", mouthOpen); // buka mulut (A, I, U, E, O)
      blendShapeProxy.update();
    }
  });

  return <group ref={group} />;
}
