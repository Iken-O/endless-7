import React, { useEffect, useRef } from 'react';
import './Roading.css';

export default function Roading({isReady}) {
    const loadingRef = useRef(null);

    useEffect(() => {
        const loading = loadingRef.current;
    
        if (!isReady) return;
    
        const handleLoad = () => {
            setTimeout(() => {
                loading.classList.add('loaded');
            }, 1000);
        };
    
        if (isReady) {
            handleLoad();
        }
    }, [isReady]);
    

    return (
        <div className='loadingWrapper' ref={loadingRef}>
            <img className='loadingImg' src="./assets/logo.webp" alt="Loading" />
            <p className="loadingText">Now Loading...</p>
        </div>
    );
}
