import React from 'react'
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import HomePageBanner from './HomePageBanner';

const BannerSlider = () => {
  return (
   
    <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className={`home-banner-page-bars`}
    >
        <SwiperSlide><HomePageBanner></HomePageBanner></SwiperSlide>
        <SwiperSlide><HomePageBanner></HomePageBanner></SwiperSlide>
        <SwiperSlide><HomePageBanner></HomePageBanner></SwiperSlide>
        
    </Swiper>
  )
}

export default BannerSlider