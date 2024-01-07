import React, { useState } from 'react';
import './ProductDetailsStyle.css';
import Gallery from './GalleryComponent';

function ProductDetails({ product }) {
  

  return (
    <div className="product-details" style={{display:'flex'}}>
        <div style={{display: 'flex'}}>
            <Gallery/>
      </div>
      <div style={{padding: '1em'}}>
      <h3>Nazwa: {product.name}</h3>
      <p>Cena: {product.price} zł</p>
      <p>Opis: {product.description}</p>
    </div>
    </div>
  );
}

export default ProductDetails;
