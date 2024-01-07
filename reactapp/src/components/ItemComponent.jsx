import React from 'react';
import './ItemStyle.css';

const ItemComponent = ({ id, name, price, description, images }) => {
  const itemImage = images && images.length > 0 ? images[0].base64 : null;

  return (
    <div className="product">
      <div>
        {itemImage && <img src={itemImage} alt="Product Image" width={300} height={300} />}
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