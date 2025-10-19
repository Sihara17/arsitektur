// src/components/AudioController.jsx
import { useEffect, useState } from "react";

export default function AudioController({ onMouthMove }) {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      source.connect(analyser);
      const dataArray = new Uint8Array(analyser.fftSize);

      function detectVolume() {
        analyser.getByteTimeDomainData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const v = (dataArray[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / dataArray.length);
        onMouthMove(rms * 5); // scale volume ke gerakan mulut
        requestAnimationFrame(detectVolume);
      }
      detectVolume();
    });
  }, [onMouthMove]);

  return null;
}
