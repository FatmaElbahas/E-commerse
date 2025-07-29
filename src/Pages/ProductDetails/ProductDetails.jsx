import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CartContext } from '../../Context/CartContext';
import Loading from '../../Components/Loading/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from '../../Components/Card/Card';
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from 'react-image-gallery';
// import "react-image-gallery/styles/css/image-gallery.css";


export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProduct, setrelatedProducts] = useState(null);

  const { AddToCart } = useContext(CartContext);
  const { id } = useParams();

  async function getProductDetails() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data.data); // مباشرة نستخدم data.data
      console.log("details",data);
      
    } catch (err) {
      console.error("Failed to fetch product details:", err);
    }
  }
  async function relatedProducts() {
  try{
      const options={
      url:`https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
      method:'GET',
    }
    const{data}=await axios.request(options);
    setrelatedProducts(data.data);
  }
  catch(error){
    console.log(error);
    
  }
  }

  useEffect(() => {
    getProductDetails();
  }, []);
useEffect(() => {
  getProductDetails();
}, [id]);

useEffect(() => {
  if (productDetails?.category?._id) {
   relatedProducts();
  }
}, [productDetails]);
  return (
    <>
      {productDetails == null ? (
        <Loading />
      ) : (
        <div className="container">
          <div className='grid grid-cols-12 py-10 gap-4'>
            <div className="image-cover col-span-4">
              {/* <img src={productDetails.imageCover} alt={productDetails.title} /> */}
              <ReactImageGallery items={productDetails.images.map((image)=>{return{original:image,thumbnail:image}})}/>
            </div>
            <div className='col-span-8 space-y-5 mt-5'>
              <div>
                <h2>{productDetails.title}</h2>
                <h3 className='text-primary-500 font-semibold'>{productDetails.category.name}</h3>
              </div>
              <p>{productDetails.description}</p>
              <div className='flex justify-between items-center'>
                <h5>{productDetails.price} EGP</h5>
                <h5>
                  {productDetails.ratingsAverage}
                  <FontAwesomeIcon className="text-amber-300 ml-1" icon={faStar} />
                </h5>
              </div>
              <button
                onClick={() => { AddToCart(id); }}
                className='btn bg-primary-500 w-full text-white'>
                Add To Cart
              </button>
            </div>
          </div>
<div>
  <h2 className='text-3xl font-semibold '>
    Related Products
  </h2>
  <Swiper slidesPerView={6} spaceBetween={10}>
      {relatedProduct?.map((product)=><SwiperSlide key={product._id}>
        <Card productInfo={product}/>
      </SwiperSlide>)}

  </Swiper>
</div>
        </div>
      )}
    </>
  );
}