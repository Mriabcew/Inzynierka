import React from 'react';
import Product from './ItemComponent'; // Importujemy komponent pojedynczego produktu
import './ItemListStyle.css';


const ItemListComponent = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          description={product.description}
        />
      ))}
    </div>
  );
};

export default ItemListComponent;