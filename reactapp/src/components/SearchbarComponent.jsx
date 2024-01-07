import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search';

function SearchbarComponent({onSearch}) {

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    setInputText(e.target.value.toLowerCase());
  }

  const handleSearch = () => {
    onSearch(inputText); // Przekazanie wprowadzonego hasła do funkcji onSearch
    console.log('Wyszukiwane hasło:', inputText);
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
            color: '#282F44',  // Zmiana koloru labela na żółty po kliknięciu
            background: '#E6AF2E',
            borderRadius: '0.75em',
            width:'15em',
            fontSize: '1.2rem',  // Zwiększenie wielkości tekstu labela
            fontWeight: 'bold',
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              border: 'none',  // Usunięcie ramki po kliknięciu
              color: '#282F44',
              borderRadius: '10px 0 0 10px',
            },
          },
          "&:focus-within": {
            background: 'rgba(255, 255, 255, 0.95)',
          },
        }}
      />
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
    </div>
  );
}

  const styles = {
    searchbar:{
      display:'flex',
      
      
    },
  }

export default SearchbarComponent;