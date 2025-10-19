import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import VrmAvatar from "./components/VrmAvatar";
import AudioController from "./components/AudioController";

export default function App() {
  const [mouth, setMouth] = useState(0);

  return (
    <>
      <AudioController onMouthMove={setMouth} />
      <Canvas camera={{ position: [0, 1.5, 2] }}>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          <VrmAvatar url="/model.vrm" mouthOpen={mouth} />
        </Suspense>
      </Canvas>
    </>
  );
}
