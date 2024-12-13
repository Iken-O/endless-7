import React from 'react'
import "./IosFrame.css"


const baseVideos = [
    { id: "bzlwrP1586g", title: "おはすず 9月1日（日）", start: "5386", end: "5947" },
    { id: "GxbTQ6y7bRY", title: "おはすず 10月2日（水）", start: "2465", end: "2913" },
    { id: "hBkJXmkGT_0", title: "おはすず 10月3日（木）", start: "2775", end: "2775" },
    { id: "hBkJXmkGT_0", title: "おはすず 10月3日（木）", start: "3184", end: "3512" },
]

export default function IosFrame() {
    return (
        <div className="iosFrameWrapper">
            <div className='iosYoutubePlayerWrapper'>
                <div className="beResponsive">
                    <div className='iosYoutubePlayer' id="player"></div>
                </div>
                <div className='youtubeDescription'>
                    <div className='youtubeTitleWrapper'>
                        <p className="youtubeTitle">video.title</p>
                        <div className="youtubeMoreWrapper">
                            <a href={`https://www.youtube.com/`} target="_blank" rel="noopener noreferrer">
                                <p className="iosYoutubeMore">続きを聴く</p>
                                <img className='youtubeMoreImg' src="/assets/more.svg" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobileArrowButtonWrapper">
                <div className="arrowButtonWrapper arrowButtonWrapperLeft">
                    <p className='arrowButtonText'>まえの話</p>
                    <button className="arrow-left arrow">
                        <svg viewBox="0 0 74 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.12508 75.5C3.95388 75.5 4.74873 75.1708 5.33478 74.5847C5.92083 73.9987 6.25008 73.2038 6.25008 72.375V3.625C6.25008 2.7962 5.92083 2.00134 5.33478 1.41529C4.74873 0.82924 3.95388 0.5 3.12508 0.5C2.29627 0.5 1.50142 0.82924 0.915367 1.41529C0.329315 2.00134 7.62939e-05 2.7962 7.62939e-05 3.625V72.375C-0.00553131 72.7869 0.0714722 73.1958 0.226532 73.5775C0.381592 73.9592 0.611565 74.3059 0.90287 74.5972C1.19418 74.8885 1.54092 75.1185 1.92258 75.2735C2.30426 75.4286 2.71314 75.5056 3.12508 75.5ZM17.2917 35.5458C17.2543 36.9978 17.5547 38.4386 18.1694 39.7547C18.784 41.0707 19.696 42.2259 20.8334 43.1292L58.7917 72.6708C60.1501 73.7 61.7626 74.3375 63.4584 74.5042H64.4167C65.8593 74.5403 67.2892 74.2257 68.5834 73.5875C70.1245 72.8354 71.4237 71.6661 72.3334 70.2125C73.2392 68.7637 73.716 67.0878 73.7084 65.3792V10.5875C73.7039 8.94429 73.2578 7.3325 72.4167 5.92083C71.55 4.51751 70.3283 3.36771 68.8751 2.5875C67.4275 1.80504 65.7946 1.43051 64.1507 1.50389C62.5069 1.57728 60.9138 2.09583 59.5417 3.00417L21.5417 28.3375C20.3334 29.1333 19.3334 30.2042 18.6251 31.4625C17.8774 32.7052 17.4215 34.1014 17.2917 35.5458Z" fill="#EB6968" />
                        </svg>
                        <p className='mobileArrowButtonText'>まえの話</p>
                    </button>
                </div>
                <div className='arrowButtonWrapper arrowButtonWrapperRight'>
                    <p className='arrowButtonText'>つぎの話</p>
                    <button className="arrow-right arrow">
                        <p className='mobileArrowButtonText'>つぎの話</p>
                        <img src="/assets/rightArrow.svg" alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}
