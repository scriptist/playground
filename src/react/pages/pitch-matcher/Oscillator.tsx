import React, { useEffect, useState } from "react";

const Oscillator: React.FC<{ isActive: boolean; pitchHz: number }> = ({
  pitchHz,
  isActive,
}) => {
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>();

  useEffect(() => {
    setAudioCtx(new AudioContext());
  }, []);

  useEffect(() => {
    if (!isActive || audioCtx == null) {
      return;
    }

    // create Oscillator node
    const oscillator = audioCtx.createOscillator();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(pitchHz, audioCtx.currentTime); // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start();

    return () => oscillator.stop();
  }, [audioCtx, pitchHz, isActive]);

  return null;
};

export default Oscillator;
