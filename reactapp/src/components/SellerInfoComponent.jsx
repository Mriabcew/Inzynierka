import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellerInfo = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  useEffect(() => {
    // Fetch user data from the endpoint
    axios.get(`https://localhost:7211/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setUser(null);
      });
  }, [userId]);

  const handleTogglePhoneNumber = () => {
    setShowPhoneNumber((prevShowPhoneNumber) => !prevShowPhoneNumber);
  };

  if (!user) {
    return null;
  }

  return (
    <div style={{
      marginBottom:'5em',
      border: '1px solid #ddd',
      borderTop: 'none',
      borderRadius: '0 0 1em 1em',
      padding: '10px',
      marginTop: '0',
      background: 'white'
    }}>
      <h3>Informacje o sprzedającym</h3>
      <p>Email: {user.email}</p>
      <Button
        onClick={handleTogglePhoneNumber}>
        {showPhoneNumber ? 'Ukryj dane sprzedającego' : 'Pokaż dane sprzedającego'}
      </Button>
      {showPhoneNumber && (
       <>
       <p>Phone Number: {user.phoneNumber}</p>
       <p>Adres: {user.address}</p>
     </>
      )}
      {/* Add more user information if needed */}
    </div>
  );
};

export default SellerInfo;
