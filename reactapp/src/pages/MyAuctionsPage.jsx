import React, { useEffect, useState } from 'react';
import LogoBarComponent from '../components/LogoBarComponent';
import ItemListComponent from '../components/ItemListComponent';
import axios from 'axios';

function MyAuctionsPage() {
  const [auctions, setAuctions] = useState([]);
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchData = async () => {
      try {
        const response = await axios.post('https://localhost:7211/Auction/GetAllByUserId', userId, {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            userId,
          },
        });

        setAuctions(response.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, []);

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
