import React, { useEffect, useRef } from 'react';
import './Roading.css';

export default function Roading() {
    const loadingRef = useRef(null);

    useEffect(() => {
        const loading = loadingRef.current;

        if (!loading) return;

        const handleLoad = () => {
            // 3秒後にローディング画面を非表示にする
            setTimeout(() => {
                loading.classList.add('loaded');
            }, 1000);
        };

        // ページの読み込み完了時に処理を実行
        window.addEventListener('load', handleLoad);

        // クリーンアップ
        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    return (
        <div className='loadingWrapper' ref={loadingRef}>
            <img className='loadingimg' src="./assets/logo.webp" alt="Loading" />
            <p className="loadingText">Now Loading...</p>
        </div>
    );
}
