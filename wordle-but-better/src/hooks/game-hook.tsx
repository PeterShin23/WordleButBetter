import * as React from 'react';
import { FormattedGuessType, GuessInfoType, TOTAL_GUESSES } from '../constants/game';

// set up of game hook inspiration from "https://blog.openreplay.com/build-a-wordle-like-game-using-react/"

const useWordleGame = (solution: string) => {
  const [currentGuess, setCurrentGuess] = React.useState({
    guessCount: 0,
    guessWord: "",
  });
  const [guesses, setGuesses] = React.useState<GuessInfoType[]>([]);
  const [isCorrect, setIsCorrect] = React.useState<boolean>(false);

  const formatGuess = () => {
    const solutionArray = Array.from(solution.toLowerCase());
    const currentGuessArray = Array.from(currentGuess.guessWord.toLowerCase());

    const formattedGuess = currentGuessArray.reduce((acc, curr, i) => {
      if (curr === solutionArray[i]) {
        acc.push({ key: curr, color: 'text-green-300' });
      }
      else if (solutionArray.includes(curr)) {
        acc.push({ key: curr, color: 'text-yellow-300' })
      } 
      else {
        acc.push({ key: curr, color: undefined })
      }

      return acc;
    }, [] as FormattedGuessType[])

    return formattedGuess;
  }

  const addNewGuess = (newGuess: FormattedGuessType[]) => {
    setGuesses([...guesses, {
      index: currentGuess.guessCount,
      guess: newGuess,
    }]);
  }

  const handleKeyUp = ({key}: KeyboardEvent) => {
    if (key === 'Enter' && currentGuess.guessWord.length === solution.length) {
      const formattedGuess = formatGuess();

      addNewGuess(formattedGuess);
      setCurrentGuess({ guessCount: currentGuess.guessCount + 1, guessWord: "" })

      return;
    }

    if (key === 'Backspace') {
      setCurrentGuess({...currentGuess, guessWord: currentGuess.guessWord.slice(0, -1)});

      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
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
    isCorrect, 
    setIsCorrect,
    handleKeyUp 
  };
}

export default useWordleGame;