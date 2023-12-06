import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem'; 
import Stack from '@mui/material/Stack';

const MyPagination = ({ currentPage, totalPages }) => {
  const handleChange = (event, value) => {
    // Tutaj możesz obsłużyć zmianę strony
    // Na przykład, użyj React Router do przekierowania do innej ścieżki
  };

  return (
    <Stack spacing={2} style={{ marginTop: '20px', justifyContent: 'center',margin:'1em 1em 1em 1em' }}>
      <Pagination
        sx={{
          display:'flex',
          justifyContent:
          'center',
        }}
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/page/${item.page}`}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default MyPagination;