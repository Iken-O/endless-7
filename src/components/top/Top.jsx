import React from 'react'
import "./Top.css"
import Counter from '../counter/Counter'

export default function Top({ startTime, isTimerStarted }) {
  return (
    <div className='topWrapper'>
      <div className="img">ロゴ</div>
      <Counter startTime={startTime} isTimerStarted={isTimerStarted} />
    </div>
  )
}
