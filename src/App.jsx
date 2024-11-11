import React from 'react'
import "./App.css";
import Top from './components/top/Top'
import Button from './components/button/Button';
import Credit from './components/credit/Credit';
import Main from './components/main/Main';

export default function App() {
  return (
    <>
      <div className="frame">
        <Top />
        <Main />
        <Button />
        <Credit />
      </div>
    </>
  );
}