import * as React from 'react';
import { FormattedGuessType, GuessInfoType, TOTAL_GUESSES } from '../constants/game';
import { isAnswer } from '../helpers/game-helper';

// set up of game hook inspiration from "https://blog.openreplay.com/build-a-wordle-like-game-using-react/"

const useWordleGame = (solution: string) => {
  const [currentGuess, setCurrentGuess] = React.useState({
    guessCount: 0,
    guessWord: "",
  });
  const [guesses, setGuesses] = React.useState<GuessInfoType[]>([]);
  const [isEnterSubmitted, setIsEnterSubmitted] = React.useState<boolean>(false);
  const [isCorrect, setIsCorrect] = React.useState<boolean>(false);

  const formatGuess = () => {
    const solutionArray = Array.from(solution.toLowerCase());
    const currentGuessArray = Array.from(currentGuess.guessWord.toLowerCase());

    const formattedGuess = currentGuessArray.reduce((acc, curr, i) => {
      if (curr === solutionArray[i]) {
        acc.push({ key: curr, color: 'bg-green-300' });
      }
      else if (solutionArray.includes(curr)) {
        acc.push({ key: curr, color: 'bg-yellow-300' });
      } 
      else {
        acc.push({ key: curr, color: undefined });
      }

      return acc;
    }, [] as FormattedGuessType[]);

    return formattedGuess;
  }

  const addNewGuess = (newGuess: FormattedGuessType[]) => {
    setGuesses([...guesses, {
      index: currentGuess.guessCount,
      guess: newGuess,
    }]);
  }

  const clearEnterSubmitted = () => {
    setIsEnterSubmitted(false);
  }

  const handleKeyUp = ({key}: KeyboardEvent) => {
    if (currentGuess.guessCount === TOTAL_GUESSES || isCorrect) return;

    else if (key === 'Enter' && currentGuess.guessWord.length === solution.length) {
      const formattedGuess = formatGuess();

      addNewGuess(formattedGuess);
      setIsEnterSubmitted(true);
      isAnswer(solution, currentGuess.guessWord) && setIsCorrect(true);
      setCurrentGuess({ guessCount: currentGuess.guessCount + 1, guessWord: "" });

      return;
    }

    else if (key === 'Backspace') {
      setCurrentGuess({...currentGuess, guessWord: currentGuess.guessWord.slice(0, -1)});

      return;
    }

    else if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.guessWord.length < solution.length) {
        setCurrentGuess({...currentGuess, guessWord: currentGuess.guessWord + key})
        return;
      }
    }
  }

  return { 
    currentGuess, 
    setCurrentGuess, 
    guesses, 
    setGuesses, 
    isEnterSubmitted,
    clearEnterSubmitted,
    isCorrect, 
    setIsCorrect,
    handleKeyUp, 
  };
}

export default useWordleGame;