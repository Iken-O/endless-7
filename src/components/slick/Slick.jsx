import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../slick/Slick.css';
import { Navigation } from 'swiper/modules';


export default function Slick() {
    return (
        <div className="swiper-container">
            <div className="arrowButtonsWrapper">
                <div className='arrowButtonWrapper arrowButtonWrapperLeft'>
                    <p className='arrowButtonText'>まえの話</p>
                    <button className="arrow-left arrow"><img src="/assets/leftArrow.svg" alt="" /></button>
                </div>
                <div className='arrowButtonWrapper arrowButtonWrapperRight'>
                    <p className='arrowButtonText'>つぎの話</p>
                    <button className="arrow-right arrow"><img src="/assets/rightArrow.svg" alt="" /></button>
                </div>
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
            >
                <SwiperSlide>
                    <div className="youtubeSliderWrapper">
                        <div className="youtubePlayer"></div>
                        <div className='youtubeDescription'>
                            <div className='youtubeTitleWrapper'>
                            <p className="youtubeTitle">【朝活】おはすず 11月3日（月）【七瀬すず菜/にじさんじ】</p>
                            <p className="youtubeDate">2024/11/04</p>
                            </div>
                            <div className='ShareSquareButtons'>
                                <div className="shareSquareButton shareSquareButtonX"><a href="https://x.com/suzuna_nanase"><img src="/assets/xIcon.png" height={22} width={21} alt="" /></a></div>
                                <div className='shareSquareButton shareSquareButtonYoutube'><a href="https://www.youtube.com/@NanaseSuzuna"><img src="/assets/ytIcon.png" height={14} width={20} alt="" /></a></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='youtubeSliderWrapper'><div className="youtubePlayer"></div></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='youtubeSliderWrapper'><div className="youtubePlayer"></div></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='youtubeSliderWrapper'><div className="youtubePlayer"></div></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='youtubeSliderWrapper'><div className="youtubePlayer"></div></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='youtubeSliderWrapper'><div className="youtubePlayer"></div></div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
