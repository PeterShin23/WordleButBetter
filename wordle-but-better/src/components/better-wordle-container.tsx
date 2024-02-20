import React from "react";

import { TOTAL_GUESSES } from "../constants/game";
import useWordleGame from "../hooks/game-hook";
import useWordContext from "../hooks/word-hook";
import { HintCard } from "./left-side-cards/hint-card";
import { ResultCard } from "./left-side-cards/result-card";
import { SettingsButton } from "./settings-button";
import { WordRow } from "./word-row";

export const BetterWordleContainer = () => {
  const { state } = useWordContext();

  const { currentGuess, handleKeyUp, guesses, isEnterSubmitted, isCorrect } = useWordleGame(state.word);

  React.useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div className="flex flex-row">
      <div className="h-screen w-5/12 select-none">
        {/* content here will be related to difficulty, category, etc */}
        {currentGuess.guessCount >= 5 && currentGuess.guessCount < TOTAL_GUESSES && (
          <HintCard />
        )}
        {currentGuess.guessCount === TOTAL_GUESSES && (
          <ResultCard result={isCorrect} />
        )}
      </div>
      <div className="h-screen w-7/12 flex justify-center items-center select-none">
        <div>
          {Array.from({length: TOTAL_GUESSES}, (_, index) => {
            if (index === currentGuess.guessCount) {
              return <WordRow key={index} currentGuess={currentGuess} />
            } 
            if (index <= guesses.length) {
              const guessAtIndex = guesses?.find((guess) => guess.index === index)?.guess

              return <WordRow key={index} previousGuess={guessAtIndex} isEnterSubmitted={isEnterSubmitted} />
            }
            else {
              return <WordRow key={index} />
            }
          })}
        </div>
      </div>
      <SettingsButton />
    </div>

  );
}