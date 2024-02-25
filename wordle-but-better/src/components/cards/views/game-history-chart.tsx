import * as React from 'react';

import { TOTAL_GUESSES } from '../../../constants/game';
import { getColorOnScore } from '../../../helpers/game-helper';
import { getGameHistoryData } from '../../../helpers/general-helper';

export const GameHistoryChart = () => {

  const { gameHistory } = getGameHistoryData();

  const history = gameHistory.history as number[]

  const gameHistoryMap = history.reduce((acc: { [key: number]: number }, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {})

  const countsPerGuessCount = Object.values(gameHistoryMap)

  const maxCount = Math.max(...countsPerGuessCount);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center pb-2 text-sm">Your Previous Results</div>
      {Array.from({ length: TOTAL_GUESSES + 1 }, (_, index) => {
          return (
            <StatRow score={index} count={gameHistoryMap[index] ?? 0} maxCount={maxCount} />
          );
        }).reverse()}
    </div>
  )
}

type StatRowProps = {
  score: number,
  count: number,
  maxCount: number,
}

const StatRow: React.FC<StatRowProps> = (props) => {
  const { score, count, maxCount } = props;

  return (
    <div className="flex flex-row py-1 w-full items-center p-4">
      <div className="pr-8 w-2 text-sm font-semibold">{score}</div>
      <div 
        className={`h-4 border-l ${getColorOnScore(score)}`} 
        style={{
          width: `${(count / maxCount) * 250}px`
        }}
      />
    </div>
  )
}