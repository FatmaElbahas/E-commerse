import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBrands();
  }, []);

  async function getBrands() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data); // هنا بنحط الـ array في state
      setLoading(false);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setLoading(false);
    }
  }

  return (
    <div className="container py-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-primary-500">Brands</h2>

      {loading ? (
        <Loading/>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <div key={brand._id} className="bg-white p-4 rounded shadow text-center">
              {/* <img src={brand.image} alt={brand.name} className="h-20 mx-auto object-contain mb-2" /> */}
                   <Link
            to={`/brand/${brand._id}`}
            className="mt-6 inline-block  text-white px-4 py-2 rounded  transition"
          >
             <img src={brand.image} alt={brand.name} className="h-20 mx-auto object-contain mb-2" />
            
          </Link>
              <h3 className="text-lg font-medium text-primary-500">{brand.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}