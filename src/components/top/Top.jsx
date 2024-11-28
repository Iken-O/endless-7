import React from 'react'
import "./Top.css"
import Counter from '../counter/Counter'

export default function Top({ startTime, isTimerStarted }) {
  return (
    <div className='topWrapper'>
      <img src="/assets/logo.webp" alt="" className='img'/>
      <Counter startTime={startTime} isTimerStarted={isTimerStarted} />
    </div>
  )
}
