import { createContext, useState } from 'react';

export default function UIStateProvider(props) {

  const [uiState, setUIState] = useState({
    left: false,//is container open or closed
    right: false,
    disabled: true, //disable FAB icons and side containers when header is expanded
    chooseCountry: true,
    showTrends: false,
    currentCountry: '',
    currentTrend: '',
  });

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

  const toggleChooseCanada = () => {
    setUIState(prev => ({
      ...prev,
      chooseCountry: !uiState.chooseCountry,
      showTrends: !uiState.showTrends,
      currentCountry: 'Canada'
    }));
  }
  const toggleChooseUsa = () => {
    setUIState(prev => ({ 
      ...prev,
      chooseCountry: !uiState.chooseCountry,
      showTrends: !uiState.showTrends,
      currentCountry: 'USA'
    }));
  }

  const onBackHandler = () => {
    setUIState(prev => ({
      ...prev,
      chooseCountry: true,
      showTrends: false
    }))
    deactivateContainer()
  }

  const activateTrendi = () => {
    setUIState(prev => ({
      ...prev,
      chooseCountry: false,
      showTrends: false
    }));
    activateContainer();
  }

  console.log('current country', uiState.currentCountry)
  const uiData = {
    uiState,
    toggleLeft,
    toggleRight,
    activateContainer,
    deactivateContainer,
    toggleChooseCanada,
    toggleChooseUsa,
    onBackHandler,
    activateTrendi
  };

  return (
    <uiContext.Provider value={uiData}>
      {props.children}
    </uiContext.Provider>
  );
};
export const uiContext = createContext();
