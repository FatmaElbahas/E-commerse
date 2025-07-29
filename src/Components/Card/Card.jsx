import React, { useContext } from 'react'
import { faCartShopping, faEye, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CartContext } from '../../Context/CartContext'
import { wishlistContext } from '../../Context/WishListContext'
import { Link } from 'react-router'

export default function Card({ productInfo }) {
  const { AddToCart } = useContext(CartContext);
  const { AddToWishlist, wishlistInfo } = useContext(wishlistContext);

  const { title, id, imageCover, description, price, ratingsAverage, category } = productInfo;

  // ✅ نتحقق هل المنتج موجود في الـ wishlist ولا لأ
  const isInWishlist = wishlistInfo?.data?.some(item => item.id === id);

  return (
    <div className="cart p-4 space-y-4 shadow-xl rounded-md group">
      <div className="image relative">
        <img src={imageCover} alt={title} />
        <div className="overlay opacity-0 absolute inset-0 bg-gray-500/40 flex justify-center items-center space-x-2 group-hover:opacity-100 transition-colors ">
          
          {/* 👁 View Product */}
          <div className="bg-primary-500 cursor-pointer hover:text-primary-500 hover:bg-white size-8 p-1 text-white rounded-full flex items-center justify-center">
            <Link to={`/product/${id}`}>
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </div>

          {/* 🛒 Add to Cart */}
          <div className="bg-primary-500 cursor-pointer hover:text-primary-500 hover:bg-white size-8 p-1 text-white rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faCartShopping} onClick={() => AddToCart(id)} />
          </div>

        {/* ❤️ Wishlist */}
<div
  className={`cursor-pointer size-8 p-1 rounded-full flex items-center justify-center transition-all duration-300
    ${isInWishlist ? 'bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700' : 'bg-primary-500 text-white hover:bg-primary-600 hover:text-white'}`}
>
  <FontAwesomeIcon
    icon={faHeart}
    onClick={() => AddToWishlist(id)}
  />
</div>

        </div>
      </div>

      {/* 🔽 Product Info */}
      <div className="cart-body">
        <h2 className="text-xl font-semibold line-clamp-1">{title}</h2>
        <h3 className="font-semibold text-lg text-primary-500">{category.name}</h3>
        <p className="font-semibold w-full line-clamp-2">{description}</p>
      </div>

      {/* 💵 السعر والتقييم */}
      <div className="flex items-center justify-between">
        <h3>{price} EGP</h3>
        <h3>
          <FontAwesomeIcon className="text-amber-300" icon={faStar} /> {ratingsAverage}
        </h3>
      </div>
    </div>
  );
}