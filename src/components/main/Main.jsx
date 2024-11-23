import React from 'react'
import Slick from '../slick/Slick';
import "./Main.css";

export default function Main({ handleArrowClick }) {
  return (
    <div className='mainWrapper'>
      <Slick handleArrowClick={handleArrowClick}  />
    </div>
  )
}
