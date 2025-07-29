import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        
        // نختار المنتجات الأعلى مبيعًا أو الأعلى تقييمًا كمميزة
        const featured = data.data
          .sort((a, b) => b.sold - a.sold || b.ratingsAverage - a.ratingsAverage)
          .slice(0, 10); // نجيب 10 فقط
        
        setProducts(featured);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  if (loading) return <div className="text-center py-10"><Loading/></div>;

  return (
    <div className="container mx-auto py-6 space-y-5">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary-600">Featured Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map(product => (
          <div key={product._id} className="bg-white p-4 rounded shadow text-center hover:shadow-lg transition">
            <img src={product.imageCover} alt={product.title} className="h-32 mx-auto object-contain mb-2" />
            <h3 className="text-sm font-semibold">{product.title}</h3>
            <p className="text-green-600 font-bold">{product.price} EGP</p>
          </div>
        ))}
      </div>
    </div>
  );
}