import React, { useContext } from 'react';
import { uiContext } from '../States/UIStateProvider'
import HoverImage from "react-hover-image";


export default function ChooseCountry(props) {

  const {
    toggleChooseCanada,
    toggleChooseUsa,
  } = useContext(uiContext);

  return (
    <>
      <div className='choose'>
        Choose a <span className='redText'>&nbsp;location&nbsp;</span> to see <span className='redText'>&nbsp;trends&nbsp;</span>
      </div>
      <div className='chooseCountry'>
        <HoverImage
          src="./images/canada.png"
          hoverSrc="./images/canadahover.png"
          className="canada"
          onClick={toggleChooseCanada}
        />
        <HoverImage
          src="./images/usa.png"
          hoverSrc="./images/usahover.png"
          className="usa"
          onClick={toggleChooseUsa}
        />
      </div>
    </>
  );
}