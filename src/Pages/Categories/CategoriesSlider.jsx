

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Loading from '../../Components/Loading/Loading';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function CategoriesSlider() {
   const[Categories,setcategory]=useState(null);
     async function getAllCategories(){
      const options={
        url:'https://ecommerce.routemisr.com/api/v1/categories',
        method:"GET",
      }
       const{data}= await axios.request(options)
      
       setcategory(data.data);
      }
      useEffect(
        ()=>{getAllCategories()},[]
      )
  return (
  <>
   <div className='Categories'>
      <div className="container">
{Categories? <Swiper 
slidesPerView={6}  
loop={true}
spaceBetween={20}
 breakpoints={{
          // Mobile screens
          0: {
            slidesPerView: 1,
          },
          // Small screens (tablet)
          640: {
            slidesPerView: 2,
          },
          // Medium screens
          768: {
            slidesPerView: 3,
          },
          // Large screens
          1024: {
            slidesPerView: 4,
          },
          // Extra large screens
          1280: {
            slidesPerView: 6,
          },
        }}
>
  {Categories.map((category)=><SwiperSlide key={category._id}>
    <img className='h-64 object-cover' src={category.image} alt=""  />
    <h2>{category.name}</h2>
    </SwiperSlide>)}
</Swiper>:<Loading/>}
       
      </div>
    </div>
  </>
  );
}
