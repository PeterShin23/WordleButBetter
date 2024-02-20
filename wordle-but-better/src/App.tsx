import * as React from 'react';
import './App.css';
import { WordContextState, wordReducer } from './reducers/word-reducer';
import { WordContext } from './contexts/word-context';
import { BetterWordleContainer } from './components/better-wordle-container';

function App() {
  const wordOfTheDay = "BOON";

  const [word, setWord] = React.useReducer(wordReducer, {
    word: wordOfTheDay,
  } as WordContextState);

  return (
    <>
      <WordContext.Provider value={{ state: word, dispatch: setWord }}>
        <BetterWordleContainer />
      </WordContext.Provider>
    </>
  );
}

export default App;
