import React from 'react';
import './ItemStyle.css';
import itemImage from '../assets/a.png';

const ItemComponent = ({ id, name, price, description }) => {
  return (
    <div className="product">
      <div>
        <img src={itemImage} alt="Product Image" width={300} height={300} />
      </div>
      <div className="text-container">
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className="price">
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemComponent;
