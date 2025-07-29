import React from 'react'
import logo from "../../assets/imgs/mini-logo.png"
export default function Footer() {
  return (
<>
<footer>
          <div className=" border-t border border-gray-300  mt-2 mb-10 "></div>

  <div className="container">
    <ul className='grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 lg:gap-7  '>
      <li className='flex flex-col gap-5 col-span-2 '>
<div className="logo flex  items-center">
        <img src={logo} alt="" className='w-[30px]' />
        <h2 className='text-xl font-bold'>Fresh Cart</h2>
    </div>
    <p className='text-gray-700'>
  FreshCart is a varsatile -commerce platform offering a wide range of products, from clothing to electronics. it provides a user-friendly experience for seamless shopping across diverse cotegories.
</p>
   <ul className="flex  gap-0 text-gray-700">
<li>
  <a href="#" className="w-10 h-10 rounded-full border-2 border-white  flex items-center justify-center text-lg">
    <i className="fa-brands fa-facebook"></i>
  </a>
</li>                            <li>
    <a href="#" className="w-10 h-10  rounded-full border-2 border-white flex items-center justify-center text-lg ">
        <i className="fa-brands fa-twitter "></i></a></li>
                            <li>
    <a href="#" className="w-10 h-10  rounded-full border-2 border-white flex items-center justify-center text-lg ">
                                <i className="fa-brands fa-linkedin-in "></i></a></li>
                            <li>
    <a href="#" className="w-10 h-10  rounded-full border-2 border-white flex items-center justify-center text-lg ">
                                    <i className="fa-solid fa-globe before:w-40 before:h-40  "></i></a></li>
                        </ul>
   </li>
   <li className='flex flex-col gap-5 items-center justify-center col-span-1 text-gray-700'>
    <h2 className='text-xl font-bold text-black'>Categories</h2>
    <ul className='flex flex-col gap-2'>
      <li>Men's Fashion</li>
      <li>Women's Fashion</li>
      <li>Baby & Toys</li>
      <li>Beauty & Health</li>
      <li>Electronics</li>
    </ul>
   </li>
   <li className='flex flex-col gap-5 items-center justify-center col-span-1 text-gray-700'>
    <h2 className='text-xl font-bold text-black'>Quick Links</h2>
    <ul className='flex flex-col gap-2'>
      <li>About Us</li>
      <li>Contact Us</li>
      <li>Privacy Policy</li>
      <li>Terms of Service</li>
      <li>Shipping Policy</li>
    </ul>
   </li>
   <li className='flex flex-col gap-5 items-center justify-center col-span-1 text-gray-700'>
    <h2 className='text-xl font-bold text-black'>Customer Service</h2>
    <ul className='flex flex-col gap-2'>
      <li>My Account</li>
      <li>My Orders</li>
            <li>Wishlist</li>
      <li>Returns & Refunds</li>
      <li>Help Center</li>
    </ul>
   </li>
    </ul>
  </div>
<div className="container">
        <div className=" border-t border-gray-300  m-4"></div>

</div>
   <div className="foot2  mt-5">
<div className="container text-gray-700 flex justify-between items-center">
              <p > ©2025 FreshCart all rights are  reserved</p>  
              <img src={logo} alt="" className='w-[30px]' /> 

  </div>            
  </div>
</footer>
</>  
)
}
