
export const isAnswer = (solution: string, word: string) => {
  return solution.toLowerCase() === word.toLowerCase();
}

export function countLetterOccurrences(word: string | string[], letter: string) {
  let count = 0;
  for (let i = 0; i < word.length; i++) {
      if (word[i].toLowerCase() === letter.toLowerCase()) {
          count++;
      }
  }
  return count;
};

export const getScoreText = (score: number, solution: string) => {
  switch (score) {
    case 10:
      return "Teach me, master.";
    case 9:
    case 8:
      return "Are you a genius or something?";
    case 7:
    case 6:
      return "I bet you carried your teams.";
    case 5:
    case 4:
      return "You win... for now...";
    case 3:
      return "Close one, ey.";
    case 2:
    case 1:
      return "I can feel your sweat from here.";
    case 0:
      return `... It was ${solution.toLowerCase()}.`;
  }
}

export const getColorOnScore = (score: number) => {
  switch (score) {
    case 10:
    case 9:
    case 8:
    case 7:
      return "bg-green-300";
    case 6:
    case 5:
    case 4:
    case 3:
      return "bg-yellow-300";
    case 2:
    case 1:
    case 0:
      return "bg-red-300"
  }
}