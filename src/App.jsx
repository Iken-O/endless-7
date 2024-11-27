import React,{useState} from 'react'
import "./App.css";
import Top from './components/top/Top'
import Button from './components/button/Button';
import Credit from './components/credit/Credit';
import Main from './components/main/Main';
import Rellax from "./components/rellax/Rellax";

export default function App() {
  const [startTime, setStartTime] = useState(null);
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const handleArrowClick = () => {
    if (!isTimerStarted) {
      setStartTime(new Date());
      setIsTimerStarted(true);
    }
  };
  return (
    <>
      <div className="frame">
        <Rellax />
        <Top startTime={startTime} isTimerStarted={isTimerStarted} />
        <Main handleArrowClick={handleArrowClick}/>
        <Button startTime={startTime} isTimerStarted={isTimerStarted} />
        <Credit />
      </div>
    </>
  );
}