import * as React from 'react';

import setting from '../static/svg/setting.svg'
import { assertIsNode } from '../utils/helpers';

export const SettingsButton = () => {
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
          <SettingsMenu settingsMenuRef={settingsMenuRef}/>
        )}  
      </div>
    </>
  )
}

type SettingsMenuProps = {
  settingsMenuRef: React.RefObject<HTMLDivElement>
}

const SettingsMenu: React.FC<SettingsMenuProps> = (props) => {
  const { settingsMenuRef } = props;

  return (
    <div ref={settingsMenuRef} className="absolute z-10 right-0 cursor-pointer">
      <div className="w-32 h-24 border-4 rounded-lg">
        <div>Setting1</div>
        <div>Setting2</div>
      </div>
    </div>
  )
}