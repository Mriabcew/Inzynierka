import React, { useState } from 'react';
import Item from './ItemComponent'; // Importujemy komponent pojedynczego produktu
import './ItemListStyle.css';
import MyPagination from './MyPaginationComponent';

const productsPerPage = 10; // Ilość produktów na stronie

const ItemListComponent = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = products.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="product-list">
      {productsToShow.map((product) => (
        <Item
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          description={product.description}
        />
      ))}

      <div>
        <MyPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ItemListComponent;
