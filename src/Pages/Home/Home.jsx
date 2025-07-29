import React, { useEffect, useState } from 'react'
import Cart from '../Cart/Cart'
import axios from 'axios'
import Loading from '../../Components/Loading/Loading';
import Card from '../../Components/Card/Card';
import HomeSlider from '../../Components/HomeSlider/HomeSlider';
import CategoriesSlider from '../Categories/CategoriesSlider';

export default function Home() {
  const[products,setProduct]=useState(null);
   async function getAllProducts(){
    const options={
      url:"https://ecommerce.routemisr.com/api/v1/products",
      method:"GET"
    }
     const{data}= await axios.request(options)
     console.log(data.data);
     setProduct(data.data);
    }
    useEffect(
      ()=>{getAllProducts()},[]
    )
  return (
   
   <>
    <div className='Home-slider m-5'>
      <HomeSlider/>
    </div>
    <div className="Category-slider  ">
      <CategoriesSlider/>
    </div>
    {/* // {products} */}
  <div className="container m-5">
   
    {products? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
      {products.map((product)=> <Card productInfo={product} key={product.id}/>)}
     
      </div>
      
      :<Loading/>} 
      
{/* <Cart/>
<Cart/>
<Cart/>
<Cart/>
<Cart/>
<Cart/> */}
    </div>
  
   </>
    
  )
}
