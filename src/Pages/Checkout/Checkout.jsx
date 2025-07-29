import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { TokenContext } from '../../Context/TokenContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../Components/Loading/Loading';
import { useNavigate } from 'react-router';

export default function Checkout() {
  const { cartInfo } = useContext(CartContext);
  const { token } = useContext(TokenContext);
    const [orderType, setOrderType] = useState(null)

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    city: Yup.string()
      .min(2, 'City name must be at least 2 characters')
      .required('City is required'),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number')
      .required('Phone number is required'),
    details: Yup.string()
      .min(10, 'Please enter more detailed address')
      .required('Address details are required'),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
     onSubmit: (values) => {

      if (orderType == 'cash') {
        makeCashOrder(values)
      } else {
        createOnlineOrder(values)
      }


    },
    validationSchema,
  });

  async function makeCashOrder(values) {
    try {
      const test = {
        shippingAddress: values,
      };

      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        data: test,
        headers: { token },
      };

      const { data } = await axios.request(options);
      navigate('/Orders');
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  }
    async function createOnlineOrder(values) {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
      method: 'POST',
      headers: {
        token
      },
      data: {
        values
      }
    }

    const { data } = await axios.request(options)
    toast.success('order made successfully')
    window.location.href = data.session.url
    console.log(data);

  }

  if (!cartInfo || !cartInfo.cartId) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-xl">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
        Shipping Address
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6 bg-white p-8 shadow-lg rounded-lg">
        
        <div>
          <label htmlFor="city" className="block text-gray-700 font-medium mb-1">City</label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your city"
          />
          {formik.touched.city && formik.errors.city && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your phone number"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="details" className="block text-gray-700 font-medium mb-1">Address Details</label>
          <textarea
            id="details"
            name="details"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your full address"
          />
          {formik.touched.details && formik.errors.details && (<p className="text-red-500 text-sm mt-1">{formik.errors.details}</p>
          )}
        </div>

     <button onClick={() => { setOrderType('cash') }} type="submit" className="btn bg-blue-600 me-2 mt-3 text-white">
          Cash Order
        </button>
        <button onClick={() => { setOrderType('online') }} type="submit" className="btn text-white bg-primary-500">
          online order
        </button>
      </form>
    </div>
  );
}