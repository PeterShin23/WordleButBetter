import * as React from "react";
import { WordContextDispatchType, WordContextState } from "../reducers/word-reducer";

export type WordContextType = {
  state: WordContextState;
  dispatch: React.Dispatch<WordContextDispatchType>;
};

export const WordContext = React.createContext<WordContextType>({} as WordContextType);
