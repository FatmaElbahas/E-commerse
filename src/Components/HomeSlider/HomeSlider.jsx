import React from 'react'
import homeSlider1 from '../../assets/imgs/slider-image-1.jpeg'
import homeSlider2 from '../../assets/imgs/slider-image-2.jpeg'
import homeSlider3 from '../../assets/imgs/slider-image-3.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function HomeSlider() {
  return (
   <div className="container">
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
  {/* Swiper Section */}
  <div className="col-span-12 md:col-span-8">
    <Swiper loop={true}>
      <SwiperSlide>
        <img src={homeSlider3} alt="" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={homeSlider2} alt="" className="w-full h-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={homeSlider1} alt="" className="w-full h-full object-cover" />
      </SwiperSlide>
    </Swiper>
  </div>

  {/* Side Images */}
  <div className="col-span-12 md:col-span-4 flex flex-col gap-2">
    <img src={homeSlider1} alt="" className="w-full h-[46.5%] md:h-[48%] object-cover" />
    <img src={homeSlider2} alt="" className="w-full h-[47.8%] md:h-[48%] object-cover" />
  </div>
</div>
   </div>
  )
}
