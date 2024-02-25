export const TOTAL_GUESSES = 10;

export type GuessInfoType = {
  index: number;
  guess : FormattedGuessType[];
}

export type FormattedGuessType = {
  key: string;
  color?: string;
}

export const COLOR_DARK = "rgb(30 41 59)" // bg-slate-800
export const COLOR_MEDIUM = "rgb(100 116 139)" // bg-slate-500
export const COLOR_LIGHT = "rgb(226 232 240)" // bg-slate-200