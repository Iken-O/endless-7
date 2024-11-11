import React from 'react'
import "./Top.css"
import Counter from '../counter/Counter'

export default function Top() {
  return (
    <div className='topWrapper'>
      <div className="img">ロゴ</div>
      <Counter />
    </div>
  )
}
