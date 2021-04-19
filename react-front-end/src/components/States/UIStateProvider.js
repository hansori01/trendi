import { createContext, useState } from 'react';

export default function UIStateProvider(props) {

  const [uiState, setUIState] = useState({
    left: false,
    right: false,
    disableContainer: true,
    containerButtonClassLeft: 'data-icon',
    containerButtonClassRight: 'tweet-icon',
    disableSearch: true,
    disableStart: true,
    disablePause: true,
    disableStop: true,
    chooseCountry: true,
    showTrends: false,
    currentCountry: '',
    currentTrend: '',
    trendiActivated: false,
    showController: false,
    loading: false,
  });


  const toggleLeft = () => {
    setUIState(prev => ({ ...prev, left: !uiState.left }))
  };
  const toggleRight = () => {
    setUIState(prev => ({ ...prev, right: !uiState.right }))
  };
  const activateContainer = () => {
    setUIState(prev => ({ ...prev, disableContainer: false, containerButtonClassLeft: 'data-icon animate', containerButtonClassRight: 'tweet-icon animate' }))
  };
  const deactivateContainer = () => {
    setUIState(prev => ({ ...prev, disableContainer: true, containerButtonClassLeft: 'data-icon', containerButtonClassRight: 'tweet-icon' }))
  };

  const toggleChooseCanada = () => {
    setUIState(prev => ({
      ...prev,
      chooseCountry: !uiState.chooseCountry,
      showTrends: !uiState.showTrends,
      disableSearch: false,
      currentCountry: 'Canada',
      showController: true
    }));
  };
  const toggleChooseUsa = () => {
    setUIState(prev => ({
      ...prev,
      chooseCountry: !uiState.chooseCountry,
      showTrends: !uiState.showTrends,
      disableSearch: false,
      currentCountry: 'USA',
      showController: true,
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
      showController: false
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
    setUIState(prev => ({
      ...prev,
      currentTrend: trend,
      disableStart: false,
      disableStop: false,
      disablePause: true,
    }));
  };

  const activateTrendi = (event) => {
    // if (event) {
    event.preventDefault();
    // }
    if (uiState.currentTrend === '') {
      // console.log('dont do that')
      return;
    }
    setUIState(prev => ({
      ...prev,
      chooseCountry: false,
      showTrends: false,
      trendiActivated: true,
      disableSearch: true,
      disableStart: true,
      disablePause: false,
      disableStop: false
    }));
    // console.log('activate trendi', uiState)
    activateContainer();
  };

  const reset = () => {
    if (uiState.currentTrend.length > 0) {
      setUIState(prev => ({
        ...prev,
        chooseCountry: false,
        showTrends: true,
        currentTrend: '',
        trendiActivated: false,
        disableSearch: false,
        disablePause: true,
        left: false,
        right: false,
        disableContainer: true,
        containerButtonClassLeft: 'data-icon',
        containerButtonClassRight: 'tweet-icon'
      }));
    } else if (uiState.trendiActivated) {
      setUIState(prev => ({
        ...prev,
        chooseCountry: false,
        showTrends: true,
        disableSearch: false,
        disableStart: false,
        disablePause: true,
        disableStop: false,
        trendiActivated: false,
        left: false,
        right: false,
        disableContainer: true,
        containerButtonClassLeft: 'data-icon',
        containerButtonClassRight: 'tweet-icon'
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
        trendiActivated: false,
        showController: false,
        left: false,
        right: false,
        disableContainer: true,
        containerButtonClassLeft: 'data-icon', 
        containerButtonClassRight: 'tweet-icon'
      }));
    }
  };

  const pauseStreamHandler = () => {
    // console.log(' running togglePause')
    setUIState(prev => ({
      ...prev,
      disableStart: false,
      disablePause: true,
    }));
  }

  const uiData = {
    uiState,
    setUIState,
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
    pauseStreamHandler
  };

  return (
    <uiContext.Provider value={uiData}>
      {props.children}
    </uiContext.Provider>
  );
};
export const uiContext = createContext();
