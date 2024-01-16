import React, { useState, useEffect } from 'react';
import Item from './ItemComponent';
import './ItemListStyle.css';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

const productsPerPage = 10;

const ItemListComponent = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, totalProducts);
  const productsToShow = products.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="product-list">
      {productsToShow.map((product) => (
        <Link key={product.id} to={`/Item/${product.id}`}>
          <Item
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            images={product.images} 
          />
        </Link>
      ))}

      <div>
        <Stack spacing={2} style={{ marginTop: '20px', justifyContent: 'center', margin: '1em 1em 1em 1em' }}>
          <Pagination
            sx={{
              display: 'flex',
              justifyContent: 'center',
              fontColor: '#fff'
              
            }}
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                sx={{
                  background: item.selected ? '#282F43' : '#fff',
                  color: item.selected ? '#fff' : '#000',
                  '&:hover': {
                    background: '#282F44',
                    color: '#fff',
                  },
                }}
                component="button"
                onClick={(e) => handlePageChange(e, item.page)}
                {...item}
              />
            )}
          />
        </Stack>
      </div>
    </div>
  );
};

export default ItemListComponent;
