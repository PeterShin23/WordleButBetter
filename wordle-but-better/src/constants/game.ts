export const TOTAL_GUESSES = 10;

export type GuessInfoType = {
  index: number;
  guess : FormattedGuessType[];
}

export type FormattedGuessType = {
  key: string;
  color?: string;
}