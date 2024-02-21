import { GuessInfoType } from "../constants/game";

export const getYearMonthDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return new Date(year, month, day, 0, 0, 0, 0);
}

export const getInitialData = () => {
  let initialData = {
    currentGuess: {
      guessCount: 0,
      guessWord: "",
    },
    guesses: [] as GuessInfoType[],
    isCorrect: false,
  }

  const existingUserData = localStorage.getItem("ps-wordle-game-user-data");

  if (existingUserData && existingUserData !== "{}") {
    const userData = JSON.parse(existingUserData);

    const userDataRecordedDate = getYearMonthDate(new Date(userData.currentDate));
    const today = getYearMonthDate(new Date());

    if (userDataRecordedDate < today) {
      localStorage.setItem("ps-wordle-game-user-data", JSON.stringify({}));
    } else {
      initialData = {
        currentGuess: userData.currentGuess,
        guesses: userData.guesses,
        isCorrect: userData.isCorrect,
      }
    }
  }

  return { currentGuess: initialData.currentGuess, guesses: initialData.guesses, isCorrect: initialData.isCorrect };
}