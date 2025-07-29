import React, { useContext, useEffect } from 'react'
import Loading from '../../Components/Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CartItem from '../../Components/CartItem/CartItem';
import { Link } from 'react-router';

export default function Cart() {
  const { getAllCart, cartInfo, clearCart } = useContext(CartContext);

  useEffect(() => {
    getAllCart();
  }, []);

  if (!cartInfo) return <Loading />;

  if (cartInfo.numOfCartItems === 0) {
    return (
      <section className='bg-gray-200 my-7 p-7 space-y-5'>
        <h2 className='text-xl font-semibold flex items-center gap-2'>
          Shop Cart <FontAwesomeIcon icon={faCartShopping} />
        </h2>
        <h5 className='text-lg font-semibold text-primary-500'>Total: 0 EGP</h5>
        <div className='flex items-center justify-center flex-col gap-4'>
          <h2 className='text-lg'>Your Cart is Empty</h2>
          <Link to={'/Home'}>
            <button className='bg-primary-500 text-white rounded-md px-4 py-2'>
              Return To Products
            </button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="container px-4 mx-auto">
      <section className='bg-gray-200 my-7 p-6 md:p-8 rounded-lg space-y-6'>
        <h2 className='text-xl font-semibold flex items-center gap-2'>
          Shop Cart <FontAwesomeIcon icon={faCartShopping} />
        </h2>

        <h5 className='text-lg font-semibold text-primary-500'>
          Total: {cartInfo.data.totalCartPrice} EGP
        </h5>

        <div className='space-y-5'>
          {cartInfo.data.products.map((cart) => (
            <CartItem key={cart._id} cartInfo={cart} />
          ))}
        </div>

        <div className='flex justify-end'>
          <button
            onClick={() => clearCart()}
            className='bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition duration-200'>
            Clear Items
          </button>
        </div>
      </section>

      <div className='flex justify-center md:justify-end mt-4'>
        <Link to={"/Checkout"}>
          <button className='btn bg-primary-500 text-white px-6 py-2 text-lg rounded hover:bg-primary-600 transition duration-200'>
            Go To Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}