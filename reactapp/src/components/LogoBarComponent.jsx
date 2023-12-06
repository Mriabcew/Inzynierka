import React, { useState } from 'react';
import '../assets/logo512.png'
import SearchbarComponent from './SearchbarComponent';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { white } from '@mui/material/colors';
import { Link } from 'react-router-dom';


function LogoBarComponent() {

  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const open = Boolean(anchorEl);

 

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    // Tutaj umieść logikę do weryfikacji autentykacji, np. komunikację z serwerem
    // Załóżmy, że jeśli logowanie jest pomyślne, ustawiamy isAuthenticated na true
    setIsAuthenticated(true);
    // Zamknij modal
    handlePopoverClose();
  };

  const handleLogout = () => {
    // Tutaj umieść logikę wylogowania, np. komunikację z serwerem
    // Załóżmy, że jeśli wylogowanie jest pomyślne, ustawiamy isAuthenticated na false
    setIsAuthenticated(false);
    // Zamknij modal
    handlePopoverClose();
  };



  return (
    <div style={styles.logoBar}>
       <Link to={'/'} style={styles.logoLink}>
      <div style={styles.logoWithText}>
         
          <img src="logo512.png" alt="Logo" style={styles.logo} />
          <div style={styles.text}></div>
        </div>
        </Link>
      <div style={styles.searchBar}>
        <SearchbarComponent/>
      </div>
      <div style={styles.loginButton}>  
      <IconButton aria-label="delete" size="large">
          <AccountCircleIcon fontSize="large" sx={{ color: 'white' }} onClick={handleIconClick}/>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, width: '400px', textAlign: 'center',display: 'flex',padding: '1em',flexDirection:'column',justifyContent:'center'}}>
          {isAuthenticated ? (
            <>
              <h2>Witaj użytkowniku!</h2>
              <Button variant="outlined" onClick={handleLogout} sx={{
                background: '#282F44',
                height: '4em',
                display: 'flex', 
                alignItems: 'center',
                justifyContent:'center',
                borderRadius: '5px',
                margin: '0.5em',
                color:'white',
                "& label.Mui-focused": {
                  color: '#282F44', 
                },
                }} >
                Wyloguj się
              </Button>
            </>
          ) : (
            <>
              <h2>Logowanie</h2>
              <TextField label="Login" fullWidth sx={{marginBottom: '0.5em',
             "& label.Mui-focused": {
              color: '#282F44',
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: '#E6AF2E'
              }}
            }}/>
              <TextField label="Hasło" type="password" fullWidth sx={{marginBottom: '0.5em',
              "& label.Mui-focused": {
                color: '#282F44',
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: '#E6AF2E'
                }}
            }}/>
              <Button variant="contained" onClick={handleLogin}
              sx={{
                background: '#282F44',
                height: '4em',
                display: 'flex', 
                alignItems: 'center',
                justifyContent:'center',
                borderRadius: '5px',
                margin: '0.5em',
                '&:hover': {
                    background: '#E6AF2E', 
                  },
                }} >
                Zaloguj się
              </Button>
              <Button variant="contained" onClick={handleLogin}
              sx={{
                background: '#282F44',
                height: '4em',
                display: 'flex', 
                alignItems: 'center',
                justifyContent:'center',
                borderRadius: '5px',
                margin: '0.5em',
                '&:hover': {
                    background: '#E6AF2E', 
                  },
                }} 
                href='/register'>
                Nie masz konta? Zarejstruj się
              </Button>
                
            </>
          )}
        </Box>
      </Popover>
      

      </div>
    </div>

  );
}

const styles = {
  logoBar: {
    backgroundColor: '#282F44',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    maxWidth: '75px',
    maxHeight: '75px',
    marginRight: '10px',
  },
  text: {
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#E6AF2E',
  },

  loginButton: {
    width:'20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '&:hover': {
      background: '#E6AF2E', 
    },
  },

  logoWithText: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
  },
  searchBar: {
    width: '60%',
    justifyContent: 'center'
  },
  logoLink: {
    width: '20%',
  }

};

export default LogoBarComponent;
