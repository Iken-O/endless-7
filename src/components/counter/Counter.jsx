import React,{useState, useEffect} from 'react'
import "./Counter.css"

export default function Counter({ startTime, isTimerStarted }) {
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    let intervalId;

    if (isTimerStarted && startTime) {
      intervalId = setInterval(() => {
        const counterWrapper = document.querySelector(".counterWrapper")
        const buttonWrapper = document.querySelector(".buttonWrapper")
        const svgPosition0 = document.querySelector(".svgPosition0")
        counterWrapper.classList.add("slidein")
        buttonWrapper.classList.add("zoomin")
        svgPosition0.classList.add("invisible")
        
        
        const now = new Date();
        const diff = now - startTime;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const formattedTime = [
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          seconds.toString().padStart(2, '0')
        ].join(':');

        setElapsedTime(formattedTime);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [startTime, isTimerStarted]);

  return (
    <div className='counterWrapper invisible'>
        <div className="textWrapper">
          <p className="title">経過時間</p>
          <p className="counter">{elapsedTime}</p>
        </div>
        <img src="/assets/counterFrame.png" alt="" className='counterFrame'/>
    </div>
  )
}
