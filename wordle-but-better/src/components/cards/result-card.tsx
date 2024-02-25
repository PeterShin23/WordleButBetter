import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Tooltip } from 'react-tooltip';
import { COLOR_DARK, COLOR_MEDIUM } from '../../constants/game';

import { getScoreText } from '../../helpers/game-helper';
import { getHistoryScoresAverage } from '../../helpers/general-helper';
import useWordContext from '../../hooks/word-hook';
import { GameHistoryChart } from './views/game-history-chart';

type ResultCardProps = {
  score: number;
  darkMode: boolean;
}

// maybe also add a react drag and drop feature to place the div in different location?
export const ResultCard: React.FC<ResultCardProps> = (props) => {
  const { score, darkMode } = props;

  const { state } = useWordContext();

  return (
    <AnimatePresence key={Math.round((Math.random()*100))}>
    <motion.div 
      className={`absolute left-1/2 top-1/2 -ml-36 -mt-28 w-72 h-56 z-10 border-4 rounded-3xl shadow-lg
        ${darkMode ? "bg-slate-700 text-white" : "bg-white"} bg-opacity-90 hover:bg-opacity-100`}
      // motion props
      initial={{opacity: 0, scale: 0.5}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3, ease: "easeOut"}}
      >
      <div>
        <div className="flex flex-col justify-center items-center m-4">
        <div className="flex font-bold text-center pb-4">
          {getScoreText(score, state.word)}
        </div>
        <div className="text-3xl font-bold pb-4">
          Score: {score}
        </div>
        <p className="flex flex-shrink text-l font-bold text-center pb-4">
          That brings your average up to
        </p>
        <div 
          className="flex flex-row font-bold cursor-pointer pb-4 ml-4" 
          data-tooltip-id="game-history-records-tooltip"
          data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<GameHistoryChart />)}
        >
          <p className="text-4xl">{getHistoryScoresAverage()}</p>
          &nbsp;
          <p className="flex items-end">/ 10</p>
        </div>
      </div>
      </div>
    </motion.div>
    <Tooltip 
      id="game-history-records-tooltip" 
      style={{ zIndex: 20, backgroundColor: `${darkMode ? COLOR_DARK : "rgb(255 255 255)"}`, color: `${darkMode ? "#EEE" : "#222"}`, borderRadius: "1.5rem" }}
      opacity={1} 
      border={`2px solid ${COLOR_MEDIUM}`} />
    </AnimatePresence>
  )
}