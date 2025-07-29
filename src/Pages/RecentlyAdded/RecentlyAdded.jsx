import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router';

export default function RecentlyAdded() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        const all = data.data;
        const sorted = all
          .map(p => ({ ...p, createdAt: new Date(p.createdAt) }))
          .sort((a, b) => b.createdAt - a.createdAt);
        setProducts(sorted.slice(0, 10)); // أختيار أول 10 فقط
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <Loading/>;

  return (
  <div className="container">
    <h2 className="text-3xl font-bold mb-6 text-center text-primary-600 my-3">  Recently Added</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
      {products.map(product => (
        <div key={product._id} className="bg-white p-4 shadow rounded text-center my-5">
            
            <img src={product.imageCover} alt={product.title} className="w-full h-32 object-contain mb-2" />
            
          
          <h3 className="text-sm font-semibold">{product.title}</h3>
          <p className="text-primary-600">{product.price} EGP</p>
        </div>
      ))}
    </div>
  </div>
  );
}