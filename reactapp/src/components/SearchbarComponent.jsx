import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function SearchbarComponent() {

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    setInputText(e.target.value);
    console.log(inputText);
  }
  return ( 
    <div className="search">
      <TextField
        id="outlined-basic"
        onChange={inputHandler}
        variant="outlined"
        fullWidth
        label="Search"
      />
    </div>
  );
  }

export default SearchbarComponent;