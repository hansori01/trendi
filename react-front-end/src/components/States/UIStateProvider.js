import { createContext, useState } from 'react';

export default function UIStateProvider(props) {

  const [uiState, setUIState] = useState({
    left: true,//is container open or closed
    right: true,
    disableContainer: true, //disable FAB icons and side containers when header is expanded
    disableSearch: true,
    disableStart: true,
    disablePause: true,
    disableStop: true,
    chooseCountry: true,
    showTrends: false,
    currentCountry: '',
    currentTrend: '',
    trendiActivated: false,
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
      disableSearch: false,
      currentCountry: 'Canada'
    }));
  };
  const toggleChooseUsa = () => {
    setUIState(prev => ({
      ...prev,
      chooseCountry: !uiState.chooseCountry,
      showTrends: !uiState.showTrends,
      disableSearch: false,
      currentCountry: 'USA'
    }));
  };

  const onBackHandler = () => {
    setUIState(prev => ({
      ...prev,
      chooseCountry: true,
      showTrends: false,
      disableSearch: true,
      disableStart: true,
      disablePause: true,
      disableStop: true,
    }))
    deactivateContainer()
  };

  const handleSearch = e => {
    if (e.target.value.length === 0) {
      setUIState(prev => ({ ...prev, disableStart: true, disableStop: true }))
    };
    if (e.target.value.length > 0) {
      setUIState(prev => ({ ...prev, disableStart: false, disableStop: false }))
    };
    setUIState(prev => ({ ...prev, currentTrend: e.target.value }));
  };

  const updateCurrentTrend = trend => {
    //TODO debug this
    setUIState(prev => ({
      ...prev,
      currentTrend: trend,
      disableStart: false,
      disableStop: false,
    }));
  };

  const activateTrendi = () => {
    // console.log('activate trendi', uiState)
    setUIState(prev => ({
      ...prev,
      chooseCountry: false,
      showTrends: false,
      trendiActivated: true,
    }));
    console.log('activate trendi', uiState)
    activateContainer();
  };

  const reset = () => {

    if (uiState.currentTrend.length > 0) {
      setUIState(prev => ({
        ...prev,
        chooseCountry: false,
        showTrends: true,
        currentTrend: ''
      }));
    } else {
      setUIState(prev => ({
        ...prev,
        chooseCountry: true,
        showTrends: false,
        currentTrend: '',
        disableSearch: true,
        disableStart: true,
        disablePause: true,
        disableStop: true,
      }));
    }
  };

  const uiData = {
    uiState,
    toggleLeft,
    toggleRight,
    activateContainer,
    deactivateContainer,
    toggleChooseCanada,
    toggleChooseUsa,
    onBackHandler,
    handleSearch,
    updateCurrentTrend,
    activateTrendi,
    reset,
  };

  return (
    <uiContext.Provider value={uiData}>
      {props.children}
    </uiContext.Provider>
  );
};
export const uiContext = createContext();
