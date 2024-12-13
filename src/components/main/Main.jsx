// import React from 'react';
// import { isIOS } from 'react-device-detect'; // iOS判定用
// import Slick from '../slick/Slick';
// import IosFrame from '../iosFrame/IosFrame';
// import './Main.css';

// export default function Main({ handleArrowClick }) {
//   return (
//     <div className="mainWrapper">
//       {isIOS ? <IosFrame /> : <Slick handleArrowClick={handleArrowClick} />}
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import Slick from '../slick/Slick';
import IosFrame from '../iosFrame/IosFrame';
import './Main.css';

export default function Main({ handleArrowClick }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // ウィンドウのリサイズイベントで幅を監視
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // クリーンアップ
  }, []);

  return (
    <div className="mainWrapper">
      {isSmallScreen ? <IosFrame handleArrowClick={handleArrowClick} /> : <Slick handleArrowClick={handleArrowClick} />}
    </div>
  );
}
