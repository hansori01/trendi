import { createContext, useState } from 'react';

export default function UIStateProvider(props) {

  const [ui, setUI] = useState({
    left: false,//is container open or closed
    right: false,
    disabled: true //disable FAB icons and side containers when header is expanded
  })

  // TODO - AR ask about diff between prev or just spreading state
  const toggleLeft = () => {
    setUI(prev => ({ ...prev, left: !ui.left }))
  };
  const toggleRight = () => {
    setUI(prev => ({ ...prev, right: !ui.right }))
  };
  const activateContainer = () => {
    setUI(prev => ({ ...prev, disabled: false }))
  };
  const deactivateContainer = () => {
    setUI(prev => ({ ...prev, disabled: true }))
  };

  const uiData = {
    ui,
    toggleLeft,
    toggleRight,
    activateContainer,
    deactivateContainer
  };

  return (
    <uiContext.Provider value={uiData}>
      {props.children}
    </uiContext.Provider>
  );
};
export const uiContext = createContext();
