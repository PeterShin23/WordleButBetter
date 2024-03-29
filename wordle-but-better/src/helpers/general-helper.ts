import { GuessInfoType } from "../constants/game";

export const getYearMonthDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
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
    darkMode: false,
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

  let historyTodayDate = new Date(gameHistory.today.date);

  const gameHistoryDate = getYearMonthDate(historyTodayDate);
  const todayDate = getYearMonthDate(new Date());

  if (!gameHistory.today.word || gameHistoryDate < todayDate) {
    wordToSet = newWord;

    const setNewWordInLocalStorage = {
      ...gameHistory,
      today: {
        date: getYearMonthDate(new Date()),
        word: wordToSet,
      },
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
};

export const setGameDarkMode = () => {
  const { gameHistory } = getGameHistoryData();

  const setDarkModeInGameHistory = {
    ...gameHistory,
    darkMode: !gameHistory.darkMode,
  }

  localStorage.setItem("ps-wordle-game-user-history-data", JSON.stringify(setDarkModeInGameHistory))
};

export const getHistoryScoresAverage = () => {
  const { gameHistory } = getGameHistoryData();

  const previousScores: number[] = gameHistory.history;
  const sum = previousScores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const average = previousScores.length ? sum / previousScores.length : 0;

  return (Math.round(average * 10) / 10).toFixed(1);
};

export const setNewGameOverride = () => {
  const { gameHistory } = getGameHistoryData();

  let renewDate = new Date(gameHistory.today.date);

  renewDate.setDate(renewDate.getDate() - 1);

  const updatedDate = new Date(renewDate);

  const existingUserData = localStorage.getItem("ps-wordle-game-user-data");

  if (existingUserData && existingUserData !== "{}") {
    const userData = JSON.parse(existingUserData);

    let dataToSet = {...userData}

    localStorage.setItem("ps-wordle-game-user-data", JSON.stringify(
      {
        ...dataToSet,
        currentDate: updatedDate,
      }
    ));
  }

  localStorage.setItem("ps-wordle-game-user-history-data", JSON.stringify({
    ...gameHistory,
    today: {
      ...gameHistory.today,
      date: updatedDate,
    }
  }))

};