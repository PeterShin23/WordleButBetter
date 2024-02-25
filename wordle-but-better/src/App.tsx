import * as React from 'react';

import './App.css';
import { WordContextState, wordReducer } from './reducers/word-reducer';
import { WordContext } from './contexts/word-context';
import { BetterWordleContainer } from './components/better-wordle-container';
import useWordleGame from './hooks/game-hook';
import { getGameHistoryData, getYearMonthDate, setTodayWord } from './helpers/general-helper';


type AppProps = {
  initialState: {
    newWordOfTheDay: string;
  }
}

export const App: React.FC<AppProps> = (props) => {

  const wordToSet = setTodayWord(props.initialState.newWordOfTheDay);

  const [wordOfTheDay, setWordOfTheDay] = React.useState<string>(wordToSet);

  const [word, setWord] = React.useReducer(wordReducer, {
    word: wordOfTheDay,
  } as WordContextState);

  const { currentGuess, handleKeyUp, guesses, isEnterSubmitted, isCorrect } = useWordleGame(wordOfTheDay);

  return (
      <WordContext.Provider value={{ state: word, dispatch: setWord }}>
        <BetterWordleContainer 
          currentGuess={currentGuess}
          handleKeyUp={handleKeyUp}
          guesses={guesses}
          isEnterSubmitted={isEnterSubmitted}
          isCorrect={isCorrect}
        />
      </WordContext.Provider>
  );
}

export default App;
