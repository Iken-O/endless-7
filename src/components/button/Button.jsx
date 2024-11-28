import React, { useState, useEffect } from 'react';
import "./Button.css";

const Button = ({ startTime, isTimerStarted }) => {
  const [elapsedTime, setElapsedTime] = useState('0秒');
  const [shareUrl, setShareUrl] = useState(() => {
    // 初期状態のURLを生成
    const baseUrl = 'https://shop.nijisanji.jp/4048';
    const initialShareText = '七瀬さんの話を 0秒 聞きました';
    const encodedText = encodeURIComponent(initialShareText + '\n');
    return `https://twitter.com/share?url=${encodeURIComponent(baseUrl)}&text=${encodedText}`;
  });

  useEffect(() => {
    let intervalId;

    if (isTimerStarted && startTime) {
      intervalId = setInterval(() => {
        const now = new Date();
        const diff = now - startTime;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        let formattedTime = '';
        if (hours > 0) formattedTime += `${hours}時間 `;
        if (hours > 0 || minutes > 0) formattedTime += `${minutes}分 `;
        formattedTime += `${seconds}秒`;

        const trimmedTime = formattedTime.trim();
        setElapsedTime(trimmedTime);

        // シェアURLを動的に更新
        const baseUrl = 'https://shop.nijisanji.jp/4048';
        const shareText = `七瀬さんの話を ${trimmedTime} 聞きました`;
        const encodedText = encodeURIComponent(shareText + '\n');
        const newShareUrl = `https://twitter.com/share?url=${encodeURIComponent(baseUrl)}&text=${encodedText}`;
        setShareUrl(newShareUrl);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [startTime, isTimerStarted]);

  return (
    <div className='buttonWrapper invisible'>
      <div className='shareButton'>
        <a href={shareUrl} rel="nofollow" target="_blank">
          <img src="assets/xIcon.png" className='xIcon' alt="" />
          <p>もう十分です...</p>
        </a>
      </div>
    </div>
  );
};

export default Button;