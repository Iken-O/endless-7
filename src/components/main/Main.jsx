import React from 'react';
import { isIOS } from 'react-device-detect'; // iOS判定用
import Slick from '../slick/Slick';
import IosFrame from '../iosFrame/IosFrame';
import './Main.css';

export default function Main({ handleArrowClick, onDataLoaded }) {
  return (
    <div className="mainWrapper">
      {isIOS ? <IosFrame handleArrowClick={handleArrowClick} onDataLoaded={onDataLoaded} /> : <Slick handleArrowClick={handleArrowClick}  onDataLoaded={onDataLoaded} />}
    </div>
  );
}
