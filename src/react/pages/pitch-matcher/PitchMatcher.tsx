import React, { useState } from "react";
import Oscillator from "./Oscillator";
import randomItem from "random-item";

const PitchMatcher: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [userPitch, setUserPitch] = useState(getFrequencyOfNoteInHz("A", 4));
  const [isUserSliding, setIsUserSliding] = useState(false);
  const [targetPitch, setTargetPitch] = useState(() => getRandomFrequency());
  const [showResult, setShowResult] = useState(true);

  return (
    <div>
      <h1>Pitch Matcher</h1>
      <label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Active
      </label>
      <br />
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
      <br />
      {showResult ? (
        <>
          <button
            onClick={() => {
              setShowResult(false);
              setIsActive(true);
              setTargetPitch(getRandomFrequency());
            }}
          >
            Reset
          </button>
          <br />
          <h2>
            Score:{" "}
            {Math.max(
              0,
              100 - Math.round(Math.abs(userPitch / targetPitch - 1) * 500)
            )}
          </h2>
        </>
      ) : (
        <button
          onClick={() => {
            setShowResult(true);
            setIsActive(false);
          }}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default PitchMatcher;

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
