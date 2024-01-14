import React, { useEffect, useRef, useState } from "react";

const Oscillator: React.FC<{
  isActive: boolean;
  pitchHz: number;
  type: OscillatorType;
}> = ({ pitchHz, isActive, type }) => {
  const [audioCtx] = useState<AudioContext>(() => new AudioContext());
  const [oscillator, setOscillator] = useState<OscillatorNode | null>();

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const volume = audioCtx.createGain();
    volume.connect(audioCtx.destination);
    volume.gain.value = type === "sawtooth" ? 0.3 : 1;

    const oscillator = audioCtx.createOscillator();
    oscillator.type = type;
    oscillator.connect(volume);
    oscillator.start();

    setOscillator(oscillator);

    return () => {
      oscillator.stop();
      setOscillator(null);
    };
  }, [isActive, type]);

  useEffect(() => {
    oscillator?.frequency.setValueAtTime(
      pitchHz,
      oscillator.context.currentTime
    );
  }, [oscillator, pitchHz]);

  return null;
};

export default Oscillator;
