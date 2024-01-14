import React, { useState } from "react";
import Oscillator from "./Oscillator";
import randomItem from "random-item";
import styled from "@emotion/styled";

const PitchMatcher: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [userPitch, setUserPitch] = useState(getFrequencyOfNoteInHz("A", 4));
  const [isUserSliding, setIsUserSliding] = useState(false);
  const [targetPitch, setTargetPitch] = useState(() => getRandomFrequency());
  const [showResult, setShowResult] = useState(true);

  return (
    <Root>
      <h1>Pitch Matcher</h1>
      <label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Active
      </label>
      <input
        max={getFrequencyOfNoteInHz(
          notes[notes.length - 1],
          octaves[octaves.length - 1]
        )}
        min={getFrequencyOfNoteInHz(notes[0], octaves[0])}
        onChange={(e) => setUserPitch(parseFloat(e.target.value))}
        onPointerDown={() => {
          setIsUserSliding(true);
          setIsActive(true);
        }}
        onPointerUp={() => setIsUserSliding(false)}
        style={{ width: "500px" }}
        type="range"
        value={userPitch}
      />
      {showResult ? (
        <>
          <Button
            onClick={() => {
              setShowResult(false);
              setIsActive(true);
              setTargetPitch(getRandomFrequency());
            }}
          >
            Reset
          </Button>
        </>
      ) : (
        <Button
          onClick={() => {
            setShowResult(true);
            setIsActive(false);
          }}
        >
          Submit
        </Button>
      )}
      <h2>
        Score:{" "}
        {showResult
          ? Math.max(
              0,
              100 - Math.round(Math.abs(userPitch / targetPitch - 1) * 500)
            )
          : "??"}
      </h2>
      <Oscillator
        pitchHz={userPitch}
        isActive={isActive && isUserSliding}
        type="sawtooth"
      />
      <Oscillator
        pitchHz={targetPitch}
        isActive={isActive && !isUserSliding}
        type="sine"
      />
    </Root>
  );
};

export default PitchMatcher;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Button = styled.button`
  background: #28b;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font: inherit;
  padding: 1em 2em;

  :hover {
    background: #269;
  }
`;

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const octaves = [4, 5];

type NoteType = (typeof notes)[number];

function getRandomFrequency(): number {
  const note = randomItem(notes);
  const octave = randomItem(octaves);

  return getFrequencyOfNoteInHz(note, octave);
}

const getNoteDistanceFromC0 = (note: NoteType, octave: number) => {
  return notes.indexOf(note) + octave * 12;
};

const getFrequencyOfNoteInHz = (note: NoteType, octave: number) =>
  440 * Math.pow(2, (getNoteDistanceFromC0(note, octave) - 57) / 12);
