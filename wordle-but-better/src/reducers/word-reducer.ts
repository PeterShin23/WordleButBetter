export type WordContextState = {
  word: string;
};

export enum WordContextAction {
  SetWord = "SetWord"
};

export type WordContextDispatchType = 
  | { type: WordContextAction.SetWord, payload: string };

const actionExecutionMap: 
  Record<WordContextAction, (state: WordContextState, payload: any)
  => WordContextState> = {
  [WordContextAction.SetWord]: (state, payload: string) => ({
    ...state,
    word: payload,
  })
}

export function wordReducer(state: WordContextState, action: WordContextDispatchType) {
  const { type, payload } = action;

  const actionExecutor = actionExecutionMap[type];

  if (!actionExecutor) {
    throw new Error("No matching action");
  }

  return actionExecutor(state, payload);
}