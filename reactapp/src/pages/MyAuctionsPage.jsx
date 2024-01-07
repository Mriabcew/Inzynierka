import React, { useEffect, useState } from 'react';
import LogoBarComponent from '../components/LogoBarComponent';
import ItemListComponent from '../components/ItemListComponent';
import data from '../data';
import axios from 'axios';

function MyAuctionsPage() {
  const [auctions, setAuctions] = useState([]);
  
  useEffect(() => {
    // Retrieve user ID from localStorage
    const userId = localStorage.getItem('userId');

    // Make a POST request to get auctions by user ID
    const fetchData = async () => {
      try {
        const response = await axios.post('https://localhost:7211/Auction/GetAllByUserId', userId, {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            userId, // assuming userId is a string
          },
        });

        // Assuming the response data is an array of auctions
        setAuctions(response.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className='Page'>
      <div><LogoBarComponent /></div>
      <div style={{ marginTop: '5em' }}>
        <ItemListComponent products={auctions} />
      </div>
    </div>
  );
}

export default MyAuctionsPage;
