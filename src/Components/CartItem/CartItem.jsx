import React, { useContext } from 'react';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from '../../Context/CartContext';

export default function CartItem({ cartInfo }) {
  const { count, price, product } = cartInfo;
  const { imageCover, title, id } = product;
  const { removeItem, updateCart } = useContext(CartContext);

  return (
    <div className="cartItem flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-md shadow-md gap-4">
      {/* Left Side - Image and Info */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <img src={imageCover} alt="" className="w-24 h-24 object-cover rounded-md" />
        <div className="text-center sm:text-left space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <h5 className="text-primary-500 font-medium">Price: {price} EGP</h5>
          <button
            onClick={() => removeItem(id)}
            className="bg-red-700 text-white px-4 py-1 rounded-md text-sm mt-2 sm:mt-0"
          >
            <FontAwesomeIcon icon={faTrash} /> Remove
          </button>
        </div>
      </div>

      {/* Right Side - Quantity Controls */}
      <div className="flex items-center gap-3 mt-2 sm:mt-0">
        <button
          onClick={() => updateCart(id, count + 1)}
          className="bg-primary-700 px-3 py-1 text-white rounded-md"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <span className="font-bold text-lg">{count}</span>
        <button
          onClick={() => updateCart(id, count - 1)}
          className="bg-primary-700 px-3 py-1 text-white rounded-md"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    </div>
  );
}