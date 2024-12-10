import React, { useEffect, useRef } from 'react';
import './Roading.css';

export default function Roading() {
    const loadingRef = useRef(null);

    useEffect(() => {
        const loading = loadingRef.current;
    
        if (!loading) return;
    
        const handleLoad = () => {
            setTimeout(() => {
                loading.classList.add('loaded');
            }, 1000);
        };
    
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }
    
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
