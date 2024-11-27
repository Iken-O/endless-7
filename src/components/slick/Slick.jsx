import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../slick/Slick.css';
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

    // 基準となる動画リスト（新しい動画を追加する際のソースとして使用）
    const baseVideos = [
        { id: "VxMbHYYszgM", title: "【朝活】おはすず 11月3日（月）【七瀬すず菜/にじさんじ】", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "9S5edniG--s", title: "【朝活】おはすず 11月4日（火）【七瀬すず菜/にじさんじ】", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "KGDoMGHXFb8", title: "【朝活】おはすず 11月5日（水）【七瀬すず菜/にじさんじ】", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "kTnxwuT6Z-g", title: "【朝活】おはすず 11月6日（木）【七瀬すず菜/にじさんじ】", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "ab1hQ1ekA8Y", title: "【朝活】おはすず 11月7日（金）【七瀬すず菜/にじさんじ】", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "B6Bs7ExEew0", title: "【朝活】おはすず 11月8日（土）【七瀬すず菜/にじさんじ】", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "pB2NXKp5OyY", title: "【朝活】おはすず 11月9日（日）【七瀬すず菜/にじさんじ】", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "rAiVEXrPmKs", title: "【朝活】おはすず 11月10日（月）【七瀬すず菜/にじさんじ】", date: "2024/11/04", start: "3318", end: "3340" },
    ];

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
        <div className="youtubeSliderWrapper">
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
                <img className='suzunaImg' src="/assets/suzuna.png" alt="" />
            </div>
        </div>
    );

    if (!isAPIReady) {
        return <div className='LoadingMessage'>Loading YouTube API...</div>;
    }

    return (
        <div className="swiper-container">
            <div className='arrowButtonWrapper arrowButtonWrapperLeft'>
                <p className='arrowButtonText'>まえの話</p>
                <button className="arrow-left arrow"><img src="/assets/leftArrow.svg" alt="" /></button>
            </div>
            <div className='arrowButtonWrapper arrowButtonWrapperRight'>
                <p className='arrowButtonText'>つぎの話</p>
                <button className="arrow-right arrow"><img src="/assets/rightArrow.svg" alt="" /></button>
            </div>
            <Swiper
                slidesPerView={1.5}
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
            >
                {/* 説明用スライドを最初に追加 */}
                <SwiperSlide key="intro-slide">
                    <IntroSlide />
                </SwiperSlide>
                {videos.map((video, index) => (
                    <SwiperSlide key={video.uniqueKey}>
                        <div className="youtubeSliderWrapper">
                            <div className='youtubeSliderShutter'></div>
                            <YouTubePlayer
                                videoId={video.id}
                                isVisible={activeSlides.has(index + 1)}
                                isReady={readySlides.has(index + 1)}
                                start={video.start}
                                end={video.end}
                                onVideoEnd={handleVideoEnd}
                            />
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
        </div>
    );
}