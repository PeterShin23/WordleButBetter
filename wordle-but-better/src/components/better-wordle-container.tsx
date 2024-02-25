import React from "react";

import { COLOR_DARK, COLOR_LIGHT, GuessInfoType, TOTAL_GUESSES } from "../constants/game";
import { getGameHistoryData } from "../helpers/general-helper";

import { ResultCard } from "./cards/result-card";
import { SettingsButton } from "./settings-button";
import { WordRow } from "./word-row";

type BetterWordleContainerProps = {
  currentGuess: {
    guessCount: number;
    guessWord: string;
  };
  handleKeyUp: ({ key }: KeyboardEvent) => void;
  guesses: GuessInfoType[];
  isEnterSubmitted: boolean;
  isCorrect: boolean;
  darkMode: boolean;
  setDarkMode: () => void;
}

export const BetterWordleContainer: React.FC<BetterWordleContainerProps> = (props) => {
  const { currentGuess, handleKeyUp, guesses, isEnterSubmitted, isCorrect, darkMode, setDarkMode } = props;

  const showResultCard: boolean = currentGuess.guessCount === TOTAL_GUESSES || isCorrect;

  React.useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div className={`flex flex-row ${darkMode ? "bg-slate-800" : "bg-slate-050"}`}>
      {showResultCard && 
        <ResultCard score={TOTAL_GUESSES - currentGuess.guessCount} darkMode={darkMode} />
      }
      <div className="h-screen w-full flex justify-center items-center select-none">
        <div>
          {Array.from({length: TOTAL_GUESSES}, (_, index) => {
            if (index === currentGuess.guessCount) {
              return <WordRow key={index} currentGuess={currentGuess} darkMode={darkMode} />
            } 
            if (index <= guesses.length) {
              const guessAtIndex = guesses?.find((guess: GuessInfoType) => guess.index === index)?.guess

              return <WordRow key={index} previousGuess={guessAtIndex} isEnterSubmitted={isEnterSubmitted} darkMode={darkMode} />
            }
            else {
              return <WordRow key={index} darkMode={darkMode} />
            }
          })}
        </div>
      </div>
      <div className="absolute top-0 right-0">
        <SettingsButton darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <div className={`absolute bottom-0 right-0 ${darkMode ? "text-white" : "text-slate-800"}`}>
        <a href="https://icons8.com/icons">Icons by Icon8</a>
      </div>
    </div>

  );
}