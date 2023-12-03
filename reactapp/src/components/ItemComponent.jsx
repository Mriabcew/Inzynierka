import React from 'react';
import './ItemStyle.css';

const ItemComponent = ({ id, name, price, description }) => {
  return (
    <div className="product">
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>{description}</p>
    </div>
  );
};

export default ItemComponent;