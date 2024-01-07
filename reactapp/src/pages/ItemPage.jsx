import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails';
import NotFound from '../components/NotFound';
import SellerInfo from '../components/SellerInfoComponent';
import './style.css';
import LogoBarComponent from '../components/LogoBarComponent';
import axios from 'axios';

function ItemPage() {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product data from the endpoint
    axios.get(`https://localhost:7211/Auction/${itemId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
        setProduct(null);
      });
  }, [itemId]);

  return (
    <div style={{ height: '100vh' }}>
      <LogoBarComponent />
      <div className="item-page" style={{ margin: '0 5em 0 5em' }}>
        {product ? (
          <div>
            <h2>{product.name}</h2>
            <div>
              <ProductDetails product={product} />
              <SellerInfo userId={product.userId} />
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
}

export default ItemPage;