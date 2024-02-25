import React from "react";

import { GuessInfoType, TOTAL_GUESSES } from "../constants/game";

import { HintCard } from "./left-side-cards/hint-card";
import { ResultCard } from "./left-side-cards/result-card";
import { SettingsButton } from "./settings-button";
import { WordRow } from "./word-row";

type BetterWordleContainerProps = {
  currentGuess: any;
  handleKeyUp: any;
  guesses: any;
  isEnterSubmitted: any;
  isCorrect: any;
}

export const BetterWordleContainer: React.FC<BetterWordleContainerProps> = (props) => {
  const { currentGuess, handleKeyUp, guesses, isEnterSubmitted, isCorrect } = props;

  const showResultCard: boolean = currentGuess.guessCount === TOTAL_GUESSES || isCorrect;

  React.useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div className="flex flex-row">
      {/* <div className="h-screen w-5/12 select-none"> */}
        {/* content here will be related to difficulty, category, etc */}
        {/* {(!showResultCard && currentGuess.guessCount >= 5 && currentGuess.guessCount < TOTAL_GUESSES) && (
          <HintCard />
        )} */}
        {/* {showResultCard && (
          <ResultCard result={isCorrect} />
        )} */}
      {/* </div> */}
      <div className="h-screen w-full flex justify-center items-center select-none">
        <div>
          {Array.from({length: TOTAL_GUESSES}, (_, index) => {
            if (index === currentGuess.guessCount) {
              return <WordRow key={index} currentGuess={currentGuess} />
            } 
            if (index <= guesses.length) {
              const guessAtIndex = guesses?.find((guess: GuessInfoType) => guess.index === index)?.guess

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