import * as React from 'react';
import { COLOR_DARK, COLOR_LIGHT } from '../constants/game';
import { getGameHistoryData, setGameDarkMode } from '../helpers/general-helper';

import setting from '../static/svg/setting.svg'
import { assertIsNode } from '../utils/helpers';

type SettingsButtonProps = {
  darkMode: boolean;
  setDarkMode: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = (props) => {
  const { darkMode, setDarkMode } = props;

  const settingsButtonRef = React.useRef<HTMLButtonElement>(null);
  const settingsMenuRef = React.useRef<HTMLDivElement>(null);

  const [showSettingsMenu, setShowSettingsMenu] = React.useState<boolean>(false);

  const toggleSettingsMenu = (e: MouseEvent) => {
    // https://stackoverflow.com/questions/71193818/react-onclick-argument-of-type-eventtarget-is-not-assignable-to-parameter-of-t
    assertIsNode(e.target);

    if (settingsMenuRef.current && settingsMenuRef.current.contains(e.target)) {
      return;
    }
    else if (settingsButtonRef.current && settingsButtonRef.current.contains(e.target)) {
      setShowSettingsMenu(!showSettingsMenu);
    }
    else {
      setShowSettingsMenu(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener('click', toggleSettingsMenu);

    return () => window.removeEventListener('click', toggleSettingsMenu);
  })

  return (
    <>
      <div className={`w-12 h-12 cursor-pointer relative right-0 top-0 mr-4 mt-4 select-none ${showSettingsMenu ? "" : "hover:animate-rotate"}`}>
        <button ref={settingsButtonRef}>
          <img src={setting} />
        </button>
        {showSettingsMenu && (
          <SettingsMenu settingsMenuRef={settingsMenuRef} darkMode={darkMode} setDarkMode={setDarkMode} />
        )}  
      </div>
    </>
  )
}

type SettingsMenuProps = {
  settingsMenuRef: React.RefObject<HTMLDivElement>;
  darkMode: boolean;
  setDarkMode: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = (props) => {
  const { settingsMenuRef, darkMode, setDarkMode } = props;

  const { gameHistory } = getGameHistoryData();

  const darkModeText = React.useMemo(() => {
    return gameHistory.darkMode 
      ? "Let there be light"
      : "Team Bravo, go dark"
  }, [darkMode])

  const [contributeText, setContributeText] = React.useState<string>("Contribute to ya boi");

  const onContributeClick = () => {
    setContributeText("jk, but look at my LinkedIn :)");

    setTimeout(() => window.open("https://www.linkedin.com/in/petershin23/", "_blank", "noreferrer"), 2500);
  }

  return (
    <div ref={settingsMenuRef} className={`absolute z-10 right-0 cursor-pointer ${darkMode ? "bg-slate-800" : "bg-slate-050"}`}>
      <div className="w-40 border-4 text-sm rounded-lg" style={{ color: `${darkMode ? COLOR_LIGHT : COLOR_DARK}` }}>
        <div className="flex justify-center items-center p-1 border-b-2">
        <button onClick={() => {
          setGameDarkMode();
          setDarkMode();
        }}>{darkModeText}</button>
        </div>
        <div className="flex justify-center items-center p-1">
        <button onClick={onContributeClick}>{contributeText}</button>
        </div>
      </div>
    </div>
  )
}