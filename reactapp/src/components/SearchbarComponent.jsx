import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

function SearchbarComponent() {

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  }

  const handleSearch = () => {
  };

  return (
    <div className="search" style={styles.searchbar}>
      <TextField
        id="outlined-basic"
        onChange={inputHandler}
        variant="outlined"
        fullWidth
        label="Wpisz czego potrzebujesz ..."
        sx={{
          borderRadius: '10px 0 0 10px',
          background: 'rgba(255,255,255,0.8)',
          border: 'solid #282F44 1px',
          "& label.Mui-focused": {
            color: '#282F44',
            background: '#E6AF2E',
            borderRadius: '0.75em',
            width:'15em',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              border: 'none',
              color: '#282F44',
              borderRadius: '10px 0 0 10px',
            },
          },
          "&:focus-within": {
            background: 'rgba(255, 255, 255, 0.95)',
          },
        }}
      />
      <Link style={{display:'flex'}} to={`/szukaj/${inputText}`}>
      <Button
        sx={{
          background: '#282F44',
          borderRadius: '0 4px 4px 0',
          '&:hover': {
            background: '#E6AF2E',
          },
        }}
        onClick={handleSearch}
      >
        
        <SearchIcon
          sx={{
            color: '#E6AF2E',
            '&:hover': {
              color: '#282F44',
            },
          }}
        />
      </Button>
      </Link>
    </div>
  );
}

  const styles = {
    searchbar:{
      display:'flex',
      
      
    },
  }

export default SearchbarComponent;