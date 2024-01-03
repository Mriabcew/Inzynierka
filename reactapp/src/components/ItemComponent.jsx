import React from 'react';
import './ItemStyle.css';
import '../assets/a.png'

const ItemComponent = ({ id, name, price, description }) => {
  return (

    <div className="product">
      <div>
        <img src="a.png" alt="Logo"></img>
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{price}</p>
    </div>
  );
};

export default ItemComponent;