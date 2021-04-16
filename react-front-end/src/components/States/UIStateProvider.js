import { createContext, useState } from 'react';

export default function UIStateProvider(props) {

  const [uiState, setUIState] = useState({
    left: false,//is container open or closed
    right: false,
    disableContainer: true, //disable FAB icons and side containers when header is expanded
    disableStart: true,
    disablePause: true,
    disableStop: true,
    chooseCountry: true,
    showTrends: false,
    currentCountry: '',
    currentTrend: '',
  });

  // const [trendState, setTrendState] = useState({
  //   currentTrend: '',

  // })

  const toggleLeft = () => {
    setUIState(prev => ({ ...prev, left: !uiState.left }))
  };
  const toggleRight = () => {
    setUIState(prev => ({ ...prev, right: !uiState.right }))
  };
  const activateContainer = () => {
    setUIState(prev => ({ ...prev, disableContainer: false }))
  };
  const deactivateContainer = () => {
    setUIState(prev => ({ ...prev, disableContainer: true }))
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

  const activateTrendi = (trend) => {
    console.log('activate trendi', uiState)
    setUIState(prev => ({
      ...prev,
      chooseCountry: false,
      showTrends: false,
      currentTrend: trend
    }));
    console.log('activate trendi', uiState)
    activateContainer();
  }

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
