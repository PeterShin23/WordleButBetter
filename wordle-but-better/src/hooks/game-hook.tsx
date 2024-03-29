import * as React from 'react';
import { FormattedGuessType, GuessInfoType, TOTAL_GUESSES } from '../constants/game';
import { countLetterOccurrences, isAnswer } from '../helpers/game-helper';
import { getGameHistoryData, getInitialData, setHistoryScores } from '../helpers/general-helper';

// set up of game hook inspiration from "https://blog.openreplay.com/build-a-wordle-like-game-using-react/"

const useWordleGame = (solution: string) => {
  const [currentGuess, setCurrentGuess] = React.useState(getInitialData().currentGuess);
  const [guesses, setGuesses] = React.useState<GuessInfoType[]>(getInitialData().guesses);
  const [isCorrect, setIsCorrect] = React.useState<boolean>(getInitialData().isCorrect);
  const [isEnterSubmitted, setIsEnterSubmitted] = React.useState<boolean>(false);

  const formatGuess = () => {
    const solutionArray = Array.from(solution.toLowerCase());
    const currentGuessArray = Array.from(currentGuess.guessWord.toLowerCase());

    let correctPlacementIndicesMap: ({ index: number } & FormattedGuessType)[] = [];
    const correctIndices: number[] = [];
    const seen: string[] = [];

    // take matches out first
    for (let i = 0; i < solutionArray.length; i++) {
      if (solutionArray[i] === currentGuessArray[i]) {
        correctPlacementIndicesMap.push({ index: i, key: solutionArray[i], color: 'bg-green-200' });
        correctIndices.push(i)
      } else {
        correctPlacementIndicesMap.push({ index: i, key: currentGuessArray[i], color: undefined });
      }
    }

    const remainderCurrentGuessArray = correctPlacementIndicesMap.filter((item) => !correctIndices.includes(item.index))
    const remainderSolutionArray = solutionArray
      .filter((char, i) => !correctIndices.includes(i))
      .map((char, i) => {
        return { index: i, key: char, color: undefined };
      });
    
    // checking the rest of the characters in case there were misleading matches or duplicate characters in the solution
    for (const item of remainderCurrentGuessArray) {     
      const solutionArray = remainderSolutionArray.map(item => item.key);
      const letter = item.key;
      
      if (solutionArray.includes(letter)) { 
        const currInSolutionFrequency = countLetterOccurrences(solutionArray, letter);
        const seenFrequency = countLetterOccurrences(seen, letter);

        if (seenFrequency < currInSolutionFrequency) {
          const replacement = { index: item.index, key: item.key, color: "bg-yellow-200"};

          correctPlacementIndicesMap = correctPlacementIndicesMap.filter((toReplace) => toReplace.index !== replacement.index)
          correctPlacementIndicesMap.push(replacement);
        }
      }

      seen.push(letter);
    }

    // ordering to get back the indices that were removed
    const formattedGuess = correctPlacementIndicesMap
      .sort((a, b) => a.index - b.index)
      .map((item) => {
        return { key: item.key, color: item.color };
      });

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
      // TODO: more enter logic
      // don't let them guess the same word
      // don't let them guess a word that doesn't exist

      const formattedGuess = formatGuess();
      const currentGuessCount = currentGuess.guessCount + 1;
      const isCorrectAnswer = isAnswer(solution, currentGuess.guessWord);

      addNewGuess(formattedGuess);
      setIsEnterSubmitted(true);
      isCorrectAnswer && setIsCorrect(true);
      setCurrentGuess({ guessCount: currentGuessCount, guessWord: "" });

      // If done, save score to game history
      if (currentGuessCount === TOTAL_GUESSES || isCorrectAnswer) {
        setHistoryScores(isCorrectAnswer ? TOTAL_GUESSES - currentGuessCount + 1 : TOTAL_GUESSES - currentGuessCount); // + 1 for getting it correct
      }

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

  React.useEffect(() => {
    let userData = {
      isCorrect: isCorrect,
      guesses: guesses,
      currentGuess: currentGuess,
      currentDate: new Date(),
    }

    localStorage.setItem("ps-wordle-game-user-data", JSON.stringify(userData));
  }, [currentGuess, guesses, isCorrect])

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