import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from './api';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Render product details as JSX elements
  const detailsList = Object.entries(product.details).map(([key, value]) => (
    <p key={key}><strong>{key}:</strong> {value}</p>
  ));

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">{product.title}</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Price: ${product.price}</h5>
          {detailsList}
        </div>
      </div>
      <Link to="/products"> Back To Home</Link>
    </div>
  );
};

export default ProductDetails;
