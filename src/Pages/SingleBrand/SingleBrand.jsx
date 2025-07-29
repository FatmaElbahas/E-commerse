import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';

export default function SingleBrand() {
  const { id } = useParams(); // بنجيب ID من الـ URL
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBrandById();
  }, [id]);

  async function getBrandById() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      setBrand(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching brand:', error);
      setLoading(false);
    }
  }

  return (
    <div className="container py-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-primary-600">Brand Details</h2>

      {loading ? (
        <Loading/>
      ) : brand ? (
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md p-6 text-center transition-transform duration-300 hover:scale-105">
    <img
      src={brand.image}
      alt={brand.name}
      className="w-32 h-32 object-contain mx-auto mb-4"
    />
    <h2 className="text-2xl font-bold text-primary-700 mb-2">{brand.name}</h2>
    <p className="text-gray-500 text-sm">Brand ID: <span className="text-gray-700">{brand._id}</span></p>

    <div className="mt-6">
      <button
        onClick={() => window.history.back()}
        className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md shadow"
      >
        ← Back to Brands
      </button>
    </div>
  </div>
</div>
      ) : (
        <p>No brand data found.</p>
      )}
    </div>
  );
}