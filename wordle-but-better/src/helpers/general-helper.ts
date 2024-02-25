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

export const getGameHistoryData = () => {
  let initialData = {
    today: {
      date: getYearMonthDate(new Date()),
      word: "",
    },
    history: [],
  }

  const existingUserHistoryData = localStorage.getItem("ps-wordle-game-user-history-data");

  if (existingUserHistoryData && existingUserHistoryData !== "{}") {
    const history = JSON.parse(existingUserHistoryData);

    initialData = {
      ...history
    }
  }

  return { gameHistory: initialData };
}

export const setTodayWord = (newWord: string) => {
  const { gameHistory } = getGameHistoryData();

  let wordToSet = "";
  const todayDate = getYearMonthDate(new Date());

  if (!gameHistory.today.word || gameHistory.today.date < todayDate) {
    wordToSet = newWord;

    const setNewWordInLocalStorage = {
      today: {
        date: getYearMonthDate(new Date()),
        word: wordToSet,
      },
      history: gameHistory.history,
    }

    localStorage.setItem("ps-wordle-game-user-history-data", JSON.stringify(setNewWordInLocalStorage))
  } else {
    wordToSet = gameHistory.today.word;
  }

  return wordToSet.toUpperCase();
}

export const setHistoryScores = (score: number) => {
  const { gameHistory } = getGameHistoryData();

  const setNewScoreInHistory = {
    ...gameHistory,
    history: [...gameHistory.history, score]
  }

  localStorage.setItem("ps-wordle-game-user-history-data", JSON.stringify(setNewScoreInHistory))
}