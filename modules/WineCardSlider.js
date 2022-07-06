import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode} from "swiper";
import 'swiper/css';
import WineCard from './WineCard';
import WineBottleHeader from './WineBottleHeader'
import style from './css/WineCard.module.css'
const WineCardSlider = () => {
  return (
    <div>
        <WineBottleHeader></WineBottleHeader>
        <div className={` ${style["wine-card-slider-container"]}`}>
         
                <Swiper
                     slidesPerView={3.13}
                     spaceBetween={24}
                     grabCursor={true}
                     loop={true}
                     modules={[FreeMode]}
                >
                <SwiperSlide><WineCard></WineCard></SwiperSlide>
                <SwiperSlide><WineCard></WineCard></SwiperSlide>
                <SwiperSlide><WineCard></WineCard></SwiperSlide>
                <SwiperSlide><WineCard></WineCard></SwiperSlide>
                <SwiperSlide><WineCard></WineCard></SwiperSlide>
            </Swiper>
        </div>
    </div>
  )
}

export default WineCardSlider