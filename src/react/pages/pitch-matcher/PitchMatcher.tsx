import React from "react";
import Oscillator from "./Oscillator";

const PitchMatcher: React.FC = () => {
  return (
    <div>
      Pitch Matcher
      <Oscillator pitchHz={440} isActive={false} />
    </div>
  );
};

export default PitchMatcher;
