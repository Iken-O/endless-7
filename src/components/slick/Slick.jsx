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

export default function Slick() {
    const [activeSlides, setActiveSlides] = useState(new Set([0]));
    const [readySlides, setReadySlides] = useState(new Set([0, 1]))
    const [isAPIReady, setIsAPIReady] = useState(false);
    const swiperRef = useRef(null);

    useEffect(() => {
        loadYouTubeAPI().then(() => {
            setIsAPIReady(true);
        });
    }, []);

    // 初期動画リストをstateとして管理
    const [videos, setVideos] = useState([
        { id: "VxMbHYYszgM", title: "【朝活】おはすず 11月3日（月）【七瀬すず菜/にじさんじ】", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "9S5edniG--s", title: "Slide 2", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "KGDoMGHXFb8", title: "Slide 3", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "kTnxwuT6Z-g", title: "Slide 4", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "ab1hQ1ekA8Y", title: "Slide 5", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "B6Bs7ExEew0", title: "Slide 6", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "pB2NXKp5OyY", title: "Slide 7", date: "2024/11/04", start: "3318", end: "3340" },
        { id: "rAiVEXrPmKs", title: "Slide 8", date: "2024/11/04", start: "3318", end: "3340" },
    ]);

    // 基準となる動画リスト（新しい動画を追加する際のソースとして使用）
    const baseVideos = [
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
        const newReadySlides = new Set([
            activeIndex - 1,
            activeIndex,
            activeIndex + 1
        ]);
        setReadySlides(newReadySlides)
        setActiveSlides(newActiveSlides);

        // 最後から2番目のスライドに到達したら新しい動画を追加
        if (activeIndex >= videos.length - 2) {
            const newVideos = [...baseVideos].map(video => ({
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
                    <SwiperSlide key={video.uniqueKey}>
                        <div className="youtubeSliderWrapper">
                            <YouTubePlayer
                                videoId={video.id}
                                isVisible={activeSlides.has(index)}
                                isReady={readySlides.has(index)}
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