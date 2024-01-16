import React, { useState, useEffect} from 'react';
import SearchbarComponent from './SearchbarComponent';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';


function LogoBarComponent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const matches = useMediaQuery('(max-width:768px)');
  const open = Boolean(anchorEl);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSearch = (inputText) => {
  };

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = async () => {
    try {
      const loginData = {
        emailOrUsername: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value,
      };

      const response = await axios.post('https://localhost:7211/Security/Login', loginData);

      console.log('Logowanie udane:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);

      setIsAuthenticated(true);
      handlePopoverClose();
    } catch (error) {
      console.error('Błąd podczas logowania:', error);
  
      if (error.response && error.response.status === 400 && error.response.data === 'No user found with the given email address or username') {
        setLoginError('Nieprawidłowy login lub hasło.');
      } else {
        setLoginError('Wystąpił błąd podczas logowania.');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.clear()
    handlePopoverClose();
  };

  return (
    <div style={styles.logoBar}>
   <Link to={'/'} style={styles.logoLink}>
      <div style={styles.logoWithText}>
      <img 
          className="Logo" 
          src={process.env.PUBLIC_URL + '/logo512.png'} 
          alt="Logo" 
          style={styles.logo} 
        />
        <div style={styles.text}></div>
      </div>
    </Link>
    <div style={styles.searchBar}>
      <SearchbarComponent onSearch={handleSearch} />
    </div>
    <div style={styles.loginButton}>
      <IconButton aria-label="delete" size="large">
        <AccountCircleIcon fontSize="large" sx={{ color: 'white' }} onClick={handleIconClick} />
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
          <Box
            sx={{
              p: 2,
              width: '400px',
              textAlign: 'center',
              display: 'flex',
              padding: '1em',
              flexDirection: 'column',
              justifyContent: 'center',
              
            }}
          >
            {isAuthenticated ? (
              <>
                <h2>Witaj użytkowniku!</h2>
                <Button
                  variant="outlined"
                  sx={{
                    background: '#282F44',
                    height: '4em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    margin: '0.5em',
                    color: 'white',
                    '& label.Mui-focused': {
                      color: '#282F44',
                    },
                    '&:hover': {
                      background: '#E6AF2E',
                    },
                  }}
                  href="/add"
                >
                  Wystaw przedmiot
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    background: '#282F44',
                    height: '4em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    margin: '0.5em',
                    color: 'white',
                    '& label.Mui-focused': {
                      color: '#282F44',
                    },
                    '&:hover': {
                      background: '#E6AF2E',
                    },
                  }}
                  href="/myAuctions"
                >
                  Moje przedmioty
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    background: '#282F44',
                    height: '4em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    margin: '0.5em',
                    color: 'white',
                    '& label.Mui-focused': {
                      color: '#282F44',
                    },
                    '&:hover': {
                      background: '#E6AF2E',
                    },
                  }}
                  href="/settings"
                >
                  Ustawienia konta
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    background: '#282F44',
                    height: '4em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    margin: '0.5em',
                    color: 'white',
                    '& label.Mui-focused': {
                      color: '#282F44',
                    },
                    '&:hover': {
                      background: '#E6AF2E',
                    },
                  }}
                >
                  Wyloguj się
                </Button>
              </>
            ) : (
              <>
                <h2>Logowanie</h2>
                {loginError && <div style={{ color: 'red',padding:'1em' }}>{loginError}</div>}
                <TextField
                  label="Login"
                  fullWidth
                  id="login-email" // Add this line
                  sx={{
                    marginBottom: '0.5em',
                    '& label.Mui-focused': {
                      color: '#282F44',
                    },
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#E6AF2E',
                      },
                    },
                  }}
                />
               
                <TextField
                  label="Hasło"
                  type="password"
                  fullWidth
                  id="login-password" // Add this line
                  sx={{
                    marginBottom: '0.5em',
                    '& label.Mui-focused': {
                      color: '#282F44',
                    },
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#E6AF2E',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  sx={{
                    background: '#282F44',
                    height: '4em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    margin: '0.5em',
                    '&:hover': {
                      background: '#E6AF2E',
                    },
                  }}
                >
                  Zaloguj się
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: '#282F44',
                    height: '4em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    margin: '0.5em',
                    '&:hover': {
                      background: '#E6AF2E',
                    },
                  }}
                  href="/register"
                >
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
    width: '75px',
    height: '75px',
    marginRight: '10px',
  },
  text: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#E6AF2E',
  },
  loginButton: {
    width: '20%',
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
    justifyContent: 'center',
  },
  logoLink: {
    width: '20%',
  },
  '@media (max-width: 768px)': {
    logoBar: {
      flexDirection: 'column',
    searchBar: {
      width: '100%',
      marginTop: '1em',
    },
    loginButton: {
      width: '100%', 
      marginTop: '1em',
      justifyContent: 'center',
    },
    logoWithText: {
      width: '100%',
      justifyContent: 'center',
    },
  },},
};

export default LogoBarComponent;
