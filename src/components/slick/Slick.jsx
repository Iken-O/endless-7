import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../slick/Slick.css';
import baseVideos from '../../data/videoUrls';
import { Navigation } from 'swiper/modules';
import { v4 as uuidv4 } from 'uuid';

//Youtube Frame APIの読み込み
const loadYouTubeAPI = () => {
    return new Promise((resolve) => {
        // APIがすでに読み込まれている場合
        if (window.YT) {
            resolve(window.YT);
            return;
        }
        // コールバック関数の設定
        window.onYouTubeIframeAPIReady = () => {
            resolve(window.YT);
        };
        // APIスクリプトの読み込み
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    });
};
//YouTubePlayerの作成
const YouTubePlayer = ({ videoId, isVisible, start, end, onVideoEnd, isReady }) => {
    const playerRef = useRef(null);
    const containerRef = useRef(null);

    // サムネイルのURLを生成
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;

    useEffect(() => {
        if (!isVisible) {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
            return;
        }

        const initPlayer = async () => {
            try {
                const YT = await loadYouTubeAPI();

                if (!containerRef.current || playerRef.current) return;

                playerRef.current = new YT.Player(containerRef.current, {
                    videoId: videoId,
                    width: '100%',
                    height: '100%',
                    playerVars: {
                        autoplay: 1,
                        controls: 1,
                        modestbranding: 1,
                        rel: 0,
                        enablejsapi: 1,
                        start: start,
                        end: end
                    },
                    events: {
                        onReady: (event) => {
                            console.log('Player ready', videoId);
                            // 読み込み完了時に再生開始
                            event.target.playVideo();
                        },
                        onStateChange: (event) => {
                            if (event.data === 0) {
                                console.log('Video ended');
                                onVideoEnd();
                            }
                        },
                        onError: (event) => {
                            console.error('Player error', event.data);
                        }
                    }
                });
            } catch (error) {
                console.error('Error initializing YouTube player:', error);
            }
        };

        initPlayer();

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [videoId, isVisible, start, end, onVideoEnd]);

    return (
        <div
            ref={containerRef}
            className="youtubePlayer"
            style={{
                backgroundImage: isReady ? `url(${thumbnailUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        />
    );
};

export default function Slick({ handleArrowClick }) {
    const [activeSlides, setActiveSlides] = useState(new Set([0]));
    const [readySlides, setReadySlides] = useState(new Set([0, 1]))
    const [isAPIReady, setIsAPIReady] = useState(false);
    const [isFirstSlide, setIsFirstSlide] = useState(true);
    const swiperRef = useRef(null);

    useEffect(() => {
        loadYouTubeAPI().then(() => {
            setIsAPIReady(true);
        });
    }, []);

    // シャッフル関数
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // 初期状態ではシャッフルした配列を使用し、uniqueKeyを付与
    const [videos, setVideos] = useState(() =>
        shuffleArray(baseVideos).map(video => ({
            ...video,
            uniqueKey: uuidv4()
        }))
    );

    const handleSlideChange = (swiper) => {
        const { activeIndex } = swiper;
        const newActiveSlides = new Set([activeIndex]);
        const newReadySlides = new Set([
            activeIndex - 1,
            activeIndex,
            activeIndex + 1
        ]);

        setIsFirstSlide(activeIndex === 0);

        handleArrowClick();
        setReadySlides(newReadySlides)
        setActiveSlides(newActiveSlides);

        // 最後から2番目のスライドに到達したら新しい動画を追加
        if (activeIndex >= videos.length - 2) {
            // baseVideosをシャッフルして新しい配列を作成
            const newVideos = shuffleArray(baseVideos).map(video => ({
                ...video,
                uniqueKey: uuidv4()
            }));
            setVideos(prevVideos => [...prevVideos, ...newVideos]);
        }

    };

    const handleVideoEnd = () => {
        console.log("videoEnd")
        // 動画終了時に次のスライドに移動
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };
    // 説明用スライドのコンポーネント
    const IntroSlide = () => (
        <div className="youtubeSliderWrapper firstYoutubeSliderWrapper">
            <div className='youtubeSliderShutter'></div>
            <div className="youtubePlayer FirstYoutubePlayer">
                <div className="introWrapper">
                    <div className="introTextWrapper">
                        <p><span className="em">思いついちゃった話</span>が<span className="em">永遠に続く！</span></p>
                        <p>終わらないおはすずが聴ける</p>
                        <p><span className="em">非公式サイト</span>です</p>
                    </div>
                    <div className='introListWrapper'>
                        <p>七瀬すず菜さん：</p>
                        <ul className='introList'>
                            <li><a href='https://www.youtube.com/@NanaseSuzuna' target="_blank" rel="noopener noreferrer">Youtube</a></li>
                            <li><a href='https://x.com/suzuna_nanase' target="_blank" rel="noopener noreferrer">X（旧Twitter）</a></li>
                        </ul>
                    </div>
                    <button onClick={handleVideoEnd} className='startButton'>視聴を開始！</button>
                </div>
                <img className='suzunaImg' src="/assets/suzuna.webp" alt="" />
            </div>
            <div className='youtubePlayer mobileYoutubePlayer'>
                <img className='mobileYoutubeImg' src="/assets/mobileYoutubeImg.webp" alt="" />
                <div className='mobileYoutubeButtonWrapper'>
                    <button onClick={handleVideoEnd} className='mobileYoutubeButton'>
                        <p className="s">再生開始！</p>
                    </button>
                </div>
            </div>
        </div>
    );

    if (!isAPIReady) {
        return <div className='LoadingMessage'>Loading YouTube API...</div>;
    }

    return (
        <div className="swiper-container">
            <Swiper
                slidesPerView={1}
                centeredSlides={true}
                spaceBetween={0}
                navigation={{
                    prevEl: '.arrow-left',
                    nextEl: '.arrow-right'
                }}
                modules={[Navigation]}
                className="mySwiper"
                onSlideChange={handleSlideChange}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{
                    769: {
                        slidesPerView: 1.5,
                    },
                }}
            >
                {/* 説明用スライドを最初に追加 */}
                <SwiperSlide key="intro-slide">
                    <IntroSlide />
                </SwiperSlide>
                {videos.map((video, index) => (
                    <SwiperSlide key={video.uniqueKey}>
                        <div className="youtubeSliderWrapper">
                            <div className='youtubeSliderShutter'></div>
                            <div className="beResponsive">
                                <YouTubePlayer
                                    videoId={video.id}
                                    isVisible={activeSlides.has(index + 1)}
                                    isReady={readySlides.has(index + 1)}
                                    start={video.start}
                                    end={video.end}
                                    onVideoEnd={handleVideoEnd}
                                />
                            </div>
                            <div className='youtubeDescription'>
                                <div className='youtubeTitleWrapper'>
                                    <p className="youtubeTitle">{video.title}</p>
                                    <div className="youtubeMoreWrapper">
                                        <a href={`https://www.youtube.com/watch?v=${video.id}&t=${video.end}s`} target="_blank" rel="noopener noreferrer">
                                            <p className="youtubeMore">続きを聴く</p>
                                            <img className='youtubeMoreImg' src="/assets/more.svg" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="mobileArrowButtonWrapper">
                <div className={`arrowButtonWrapper arrowButtonWrapperLeft ${isFirstSlide ? 'disabled' : ''}`}>
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
    );
}