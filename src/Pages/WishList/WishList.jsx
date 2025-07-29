import React, { useContext, useEffect } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'; // ✅ صححي الرابط
import { wishlistContext } from '../../Context/WishListContext';
import Loading from '../../Components/Loading/Loading';

export default function WishList() {
  const { getAllwishList, wishlistInfo, removeFromWishlist } = useContext(wishlistContext);

  useEffect(() => {
    getAllwishList();
  }, []);

  if (!wishlistInfo) {
    return <Loading />;
  }

  if (wishlistInfo.count === 0) {
    return (
      <section className="bg-gray-100 my-10 p-10 rounded-md shadow-sm text-center space-y-5">
        <FontAwesomeIcon icon={faHeart} className="text-4xl text-primary-500" />
        <h2 className="text-2xl font-bold text-gray-700">Your Wishlist is Empty</h2>
        <Link to="/home">
          <button className="bg-primary-500 text-white px-5 py-2 rounded-md hover:bg-primary-600 transition-all">
            Return to Products
          </button>
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 my-10 p-10 rounded-md shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
<FontAwesomeIcon
  icon={faHeart}
  className="text-red-500 cursor-pointer hover:text-red-600"
  onClick={ () => {
     removeFromWishlist(item.id);
  }}
/>        Your Wishlist
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistInfo.data.map((item) => (
          <div key={item.id} className="bg-white shadow rounded-lg p-4 relative group transition hover:shadow-md">
            <img src={item.imageCover} alt={item.title} className="w-full h-40 object-contain mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-primary-500 font-bold">{item.price} EGP</span>
              <FontAwesomeIcon
                icon={faHeart}
                className="text-red-500 cursor-pointer hover:text-red-600"
                onClick={() => removeFromWishlist(item.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="w-fit ms-auto mt-8">
        <Link to="/home">
          <button className="bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </section>
  );
}