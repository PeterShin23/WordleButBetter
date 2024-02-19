import * as React from 'react';
import { FormattedGuessType } from '../constants/game';
import useWordContext from '../hooks/word-hook';
import { LetterBlock } from './letter-block';

type WordRowProps = {
  previousGuess?: FormattedGuessType[],
  currentGuess?: {
    guessCount: number;
    guessWord: string;
  }
  isEnterSubmitted?: boolean;
  clearEnterSubmitted?: () => void;
}

export const WordRow: React.FC<WordRowProps> = (props) => {
  const { currentGuess, previousGuess, isEnterSubmitted } = props;

  const { state } = useWordContext();
  const { word } = state;

  if (!!previousGuess) {
    return (
      <div className="flex flex-row justify-center items-center">
        {Array.from(word, (char, index) => {
          return (
            <LetterBlock 
              key={index} 
              index={index}
              letter={previousGuess[index]?.key.toUpperCase() ?? ""} 
              color={previousGuess[index]?.color}
              isEnterSubmitted={isEnterSubmitted}
            />
          );
        })}
      </div>
    )
  }

  else if (!!currentGuess?.guessWord) {
    return (
      <div className="flex flex-row justify-center items-center">
        {Array.from(word, (char, index) => {
          return (
            <LetterBlock 
              key={index} 
              index={index}
              letter={currentGuess?.guessWord[index]?.toUpperCase() ?? ""} 
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-row justify-center items-center">
      {Array.from(word, (_, index) => {
        return <LetterBlock key={index} index={index} letter={""} />;
      })}
    </div>
  )
}