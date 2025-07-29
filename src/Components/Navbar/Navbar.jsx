// داخل Navbar.jsx

import React, { useEffect } from 'react';
import logo from "../../assets/imgs/mini-logo.png"
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { TokenContext } from '../../Context/TokenContext';
import { useContext, useState } from "react";
import { CartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishListContext';

export default function Navbar({   }) {
  const { Logout } = useContext(TokenContext); // جايباه من الـ context بس
  const { cartInfo } = useContext(CartContext); // جايباه من الـ context بس
  const { wishlistInfo } = useContext(wishlistContext); // جايباه من الـ context بس
  const [navOpen, setNavOpen] = useState(false);
  const [nav3open, setNav3open] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  
  // باقي الكود...

  const navigate = useNavigate();

  const toggleSidebar = () => setNavOpen(!navOpen);
  const toggleNav3 = () => setNav3open(!nav3open);
  const toggleCategories = () => setIsOpen(!isOpen);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(res => setCategories(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const goToCategory = (id) => {
    navigate(`/category/${id}`);
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50 ">
      {/* Nav2 */}
      <div className="nav2 mt-3 flex justify-between items-center px-4 py-4">
        <div className="logo flex items-center gap-2">
          <img src={logo} alt="logo" className="w-[30px]" />
          <h2 className="text-2xl font-bold">Fresh Cart</h2>
        </div>

        <div className="searchBox relative w-1/2 mx-auto hidden lg:block">
          <input type="search" className="w-full py-1 border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:border-primary-600 placeholder:text-gray-400" placeholder="Search For Products" />
          <i className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2"></i>
        </div>

        <ul className="lg:flex hidden items-center justify-center gap-6">
          {localStorage.getItem('token') ? (
            <>
              <li className='flex flex-col items-center justify-center relative'>
                <NavLink to="WishList" className={({ isActive }) => `flex flex-col items-center justify-center relative ${isActive ? "text-primary-600" : ""}`}>
                  <i className="fa-regular fa-heart text-2xl"></i>
                  <p>WishList</p>
                  <span className='absolute top-[-5px] right-1.5 bg-primary-700 text-white rounded-full min-w-[18px] h-[18px] text-xs px-1 flex items-center justify-center'>
                    {wishlistInfo == null
                      ? <FontAwesomeIcon icon={faSpinner} className="animate-spin text-[10px]" />
                      : wishlistInfo.count}
                  </span>
                </NavLink>
              </li>
              <li className='flex flex-col items-center justify-center relative'>
                <NavLink to="Cart" className={({ isActive }) => `flex flex-col items-center justify-center relative ${isActive ? "text-primary-800" : ""}`}>
                  <i className="fa-solid fa-cart-shopping text-2xl"></i>
                  <p>Cart</p>
                  <span className='absolute top-[-5px] right-1.5 bg-primary-700 text-white rounded-full min-w-[18px] h-[18px] text-xs px-1 flex items-center justify-center'>
                    {cartInfo == null
                      ? <FontAwesomeIcon icon={faSpinner} className="animate-spin text-[10px]" />
                      : cartInfo.numOfCartItems}
                  </span>
                </NavLink>
              </li>
            </>
          ) : null}

          {localStorage.getItem('token') ? (
            <li className="flex flex-col items-center justify-center">
  <button
    onClick={() => {
      Logout();        // من الكونتكست
      navigate("/Login");  // بعد ما يشيل التوكن
    }}
    className="flex flex-col items-center justify-center text-gray-700 hover:text-primary-600"
  >
    <i className="fa-solid fa-right-to-bracket text-2xl"></i>
    <p>Logout</p>
  </button>
</li>
           
          ) : (
            <>
              <li className='flex flex-col items-center justify-center'><NavLink to="Account" className={({ isActive }) => `flex flex-col items-center justify-center relative ${isActive ? "text-primary-600" : ""}`}>
                  <i className="fa-regular fa-user"></i>
                  <p>Account</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="Signup" className={({ isActive }) => `flex flex-col items-center justify-center relative ${isActive ? "text-primary-600" : ""}`}>
                  <i className="fa-solid fa-user-plus"></i>
                  <p>SignUp</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="Login" className={({ isActive }) => `flex flex-col items-center justify-center relative ${isActive ? "text-primary-600" : ""}`}>
                  <i className="fa-regular fa-id-card"></i>
                  <p>Login</p>
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="icon lg:hidden">
          <button className='btn' onClick={toggleSidebar}><i className="fa-solid fa-bars "></i></button>
        </div>
      </div>

      {/* Nav3 */}
      {localStorage.getItem('token') && (
        <div className="nav3 mt-5 bg-gray-200 py-3 hidden lg:block">
          <div className="container flex items-center gap-3">
            <div className="relative hidden lg:block">
              <button onClick={toggleCategories} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                <i className="fa-solid fa-bars"></i>
                All Categories
                <i className="fa-solid fa-chevron-down text-sm"></i>
              </button>

              {isOpen && (
                <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-md z-50 max-h-80 overflow-y-auto">
                  <ul className="py-2">
                    {categories.map(category => (
                      <li key={category._id}>
                        <button
                          onClick={() => goToCategory(category._id)}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <i className="fa-solid fa-tag text-primary-600"></i>
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <ul className="lg:flex hidden items-center justify-center gap-5 text-lg">
              <li><NavLink to="/Home" className={({ isActive }) => `flex flex-col items-center justify-center relative ${isActive ? "text-primary-600" : ""}`}>Home</NavLink></li>
              <li><NavLink to="/RecentlyAdded" className={({ isActive }) => `flex flex-col items-center justify-center relative ${isActive ? "text-primary-600" : ""}`}>Recently Added</NavLink></li>
              <li><NavLink to="/FeaturedProducts" className={({ isActive }) => `flex flex-col items-center justify-center relative ${isActive ? "text-primary-600" : ""}`}>Featured Products</NavLink></li>
              <li><NavLink to="/Brands">Brands</NavLink></li>
            </ul>
          </div>
        </div>
      )}

      {/* Mobile Sidebar */}
      {navOpen && (
        <div className="fixed inset-0  bg-opacity-50 z-50 lg:hidden" >
          <div className="fixed top-0 left-0 w-100 bg-white h-full shadow-lg p-4 overflow-y-auto">
               {/* Exit Button */}
      <div className="flex justify-end">
        <button
          className="text-2xl font-bold text-gray-600 hover:text-red-500"
          onClick={toggleSidebar}
        >
          &times;
        </button>
      </div>


            {/* Nav2 */}
            <ul className="mb-4 space-y-3">
             <NavLink   className={({ isActive }) => `block ${isActive ? "text-primary-600 font-bold" : "text-gray-700"}`
            }
            to="/Home"
          
          >
            Home
          </NavLink>
              <li><NavLink className={({ isActive }) => `block ${isActive ? "text-primary-600 font-bold" : "text-gray-700"}`} to="/RecentlyAdded">Recently Added</NavLink></li>
              <li><NavLink className={({ isActive }) => `block ${isActive ? "text-primary-600 font-bold" : "text-gray-700"}`}  to="/FeaturedProducts">Featured Products</NavLink></li>
              <li><NavLink className={({ isActive }) => `block ${isActive ? "text-primary-600 font-bold" : "text-gray-700"}`}  to="/Brands">Brands</NavLink></li>
            {/* All Categories Dropdown */}
<li>
  <button
    onClick={() => setShowCategories(!showCategories)}
    className="flex items-center gap-2 text-gray-700 font-semibold"
  >
    <i className="fa-solid fa-bars"></i>
    All Categories
    <i className={`fa-solid fa-chevron-${showCategories ? "up" : "down"} text-sm`}></i>
  </button>

  {showCategories && (
    <ul className="pl-4 mt-2 space-y-1">
      {categories.map(cat => (
        <li key={cat._id}>
          <button
            onClick={() => {
              goToCategory(cat._id);
              setShowCategories(false); // غلق الـ Dropdown بعد الضغط
             
            }}
            className="text-gray-600 hover:text-primary-600"
          >
            {cat.name}
          </button>
        </li>
      ))}
    </ul>
  )}
</li>
              <hr />
              {localStorage.getItem('token') ? (
                <>
                  <li><NavLink className={({ isActive }) => `block ${isActive ? "text-primary-600 font-bold" : "text-gray-700"}`}  to="WishList">Wishlist</NavLink></li>
                  <li><NavLink className={({ isActive }) => `block ${isActive ? "text-primary-600 font-bold" : "text-gray-700"}`}  to="Cart">Cart</NavLink></li>
                  <li><NavLink className={({ isActive }) => `block ${isActive ? "text-primary-600 font-bold" : "text-gray-700"}`}  to="/" onClick={Logout}>Logout</NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink className={({ isActive }) => `block ${isActive ? "text-primary-600 font-bold" : "text-gray-700"}`}  to="Login">Login</NavLink></li>
                  <li><NavLink className={({ isActive }) => `block ${isActive ? "text-primary-600 font-bold" : "text-gray-700"}`}  to="Signup">Signup</NavLink></li>
                  <li><NavLink className={({ isActive }) => `block ${isActive ? "text-primary-600 font-bold" : "text-gray-700"}`}  to="Account">Account</NavLink></li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
