
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