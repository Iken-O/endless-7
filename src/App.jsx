import React, { useState } from 'react'
import "./App.css";
import Top from './components/top/Top'
import Button from './components/button/Button';
import Credit from './components/credit/Credit';
import Main from './components/main/Main';
import Rellax from "./components/rellax/Rellax";
import Roading from './components/roading/Roading';

export default function App() {
  const [startTime, setStartTime] = useState(null);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);


  const handleArrowClick = () => {
    if (!isTimerStarted) {
      setStartTime(new Date());
      setIsTimerStarted(true);
    }
  };
  return (
    <>
      <div className="frame">
        <div className="polygon">
          <Roading isReady={isReady} />
          <Rellax />
          <Top startTime={startTime} isTimerStarted={isTimerStarted} />
          <Main handleArrowClick={handleArrowClick} onDataLoaded={() => setIsReady(true)} />
          <Button startTime={startTime} isTimerStarted={isTimerStarted} />
          <Credit />
        </div>
      </div>
    </>
  );
}