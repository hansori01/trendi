import { createContext, useState } from 'react';

export default function UIStateProvider(props) {

  const [uiState, setUIState] = useState({
    left: false,//is container open or closed
    right: false,
    disabled: true //disable FAB icons and side containers when header is expanded
  })

  // TODO - AR ask about diff between prev or just spreading state
  const toggleLeft = () => {
    setUIState(prev => ({ ...prev, left: !uiState.left }))
  };
  const toggleRight = () => {
    setUIState(prev => ({ ...prev, right: !uiState.right }))
  };
  const activateContainer = () => {
    setUIState(prev => ({ ...prev, disabled: false }))
  };
  const deactivateContainer = () => {
    setUIState(prev => ({ ...prev, disabled: true }))
  };

  const uiData = {
    uiState,
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
