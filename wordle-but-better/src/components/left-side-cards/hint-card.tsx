import * as React from 'react';

import bernieHint from '../../static/gif/bernie-hint.gif'

const category = "ANIMAL";

enum HintDisplay {
  Initial = 1,
  Hint = 2,
  NoHint = 3,
}

type HintCardProps = {
}

export const HintCard: React.FC<HintCardProps> = (props) => {
  const [hint, setHint] = React.useState<{ title: string, showHint: HintDisplay }>({
    title: "Would you like a hint?",
    showHint: HintDisplay.Initial,
  });

  const hintOnClickHandler = (val: boolean) => {
    let newHint = {...hint};

    if (val) {
      newHint = { title: "Category", showHint: HintDisplay.Hint }
    } else {
      newHint = { title: "Your Loss", showHint: HintDisplay.NoHint }
    }

    setHint(newHint);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border-4 rounded-2xl w-2/3 h-1/2">
        <div className="flex flex-col h-full items-center">
          <p className="text-2xl font-bold mx-8 mt-8">{hint.title}</p>
          <img className="m-4 w-56" src={bernieHint} alt="loading..." />
          {hint.showHint === HintDisplay.Initial && (
            <div className="flex flex-row text-slate-50 font-medium">
              <button 
                className="border-2 border-blue-700 rounded p-1 mr-2 bg-blue-500"
                onClick={() => hintOnClickHandler(true)}
              >
                Gimme...
              </button>
              <button 
                className="border-2 border-red-700 rounded p-1 bg-red-500"
                onClick={() => hintOnClickHandler(false)}
              >
                Who do you think I am?
              </button>
            </div>
          )}
          {hint.showHint === HintDisplay.Hint && (
            <div className="flex flex-row text-2xl font-bold">{category}</div>
          )}
          {hint.showHint === HintDisplay.NoHint && (
            <div className="flex flex-row font-medium">
              just don't regret it.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}