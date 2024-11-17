import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../slick/Slick.css';
import { Navigation } from 'swiper/modules';

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
const YouTubePlayer = ({ videoId, isVisible, start, end, onVideoEnd }) => {
    const playerRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!isVisible) {
            if (playerRef.current) {
                // プレーヤーのクリーンアップ
                playerRef.current.destroy();
                playerRef.current = null;
            }
            return;
        }

        // プレーヤーの初期化
        const initPlayer = async () => {
            try {
                const YT = await loadYouTubeAPI();

                if (!containerRef.current || playerRef.current) return;

                playerRef.current = new YT.Player(containerRef.current, {
                    videoId: videoId,
                    width: '100%',
                    height: '100%',
                    playerVars: {
                        autoplay: 0, // 自動再生を有効化
                        controls: 1,
                        modestbranding: 1,
                        rel: 0,
                        enablejsapi: 1,
                        start: start,
                        end: end
                    },
                    events: {
                        // onReady: (event) => {
                        //     console.log('Player ready', videoId);
                        //     // 読み込み完了時に再生開始
                        //     event.target.playVideo();
                        // },
                        onStateChange: (event) => {
                            // 動画が終了したとき（YT.PlayerState.ENDED = 0）
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

    return <div ref={containerRef} className="youtubePlayer" />;
};

export default function Slick() {
    const [activeSlides, setActiveSlides] = useState(new Set([0]));
    const [isAPIReady, setIsAPIReady] = useState(false);
    const swiperRef = useRef(null);

    useEffect(() => {
        loadYouTubeAPI().then(() => {
            setIsAPIReady(true);
        });
    }, []);

    const videos = [
        { id: "VxMbHYYszgM", title: "【朝活】おはすず 11月3日（月）【七瀬すず菜/にじさんじ】", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "9S5edniG--s", title: "Slide 2", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "KGDoMGHXFb8", title: "Slide 3", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "kTnxwuT6Z-g", title: "Slide 4", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "ab1hQ1ekA8Y", title: "Slide 5", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "B6Bs7ExEew0", title: "Slide 6", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "pB2NXKp5OyY", title: "Slide 7", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "rAiVEXrPmKs", title: "Slide 8", date: "2024/11/04", start: "3318", end: "3340" },
    ];

    const handleSlideChange = (swiper) => {
        const { activeIndex } = swiper;
        const newActiveSlides = new Set([activeIndex]);
        setActiveSlides(newActiveSlides);
    };

    const handleVideoEnd = () => {
        console.log("videoEnd")
        // 動画終了時に次のスライドに移動
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    if (!isAPIReady) {
        return <div>Loading YouTube API...</div>;
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
                {videos.map((video, index) => (
                    <SwiperSlide key={video.id}>
                        <div className="youtubeSliderWrapper">
                            <YouTubePlayer
                                videoId={video.id}
                                isVisible={activeSlides.has(index)}
                                start={video.start}
                                end={video.end}
                                onVideoEnd={handleVideoEnd}
                            />
                            <div className='youtubeDescription'>
                                <div className='youtubeTitleWrapper'>
                                    <p className="youtubeTitle">{video.title}</p>
                                    <p className="youtubeDate">{video.date}</p>
                                </div>
                                <div className='ShareSquareButtons'>
                                    <div className="shareSquareButton shareSquareButtonX">
                                        <a href="https://x.com/suzuna_nanase">
                                            <img src="/assets/xIcon.png" height={22} width={21} alt="" />
                                        </a>
                                    </div>
                                    <div className='shareSquareButton shareSquareButtonYoutube'>
                                        <a href="https://www.youtube.com/@NanaseSuzuna">
                                            <img src="/assets/ytIcon.png" height={14} width={20} alt="" />
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