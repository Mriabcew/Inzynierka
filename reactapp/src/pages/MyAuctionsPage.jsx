import React from 'react'
import LogoBarComponent from '../components/LogoBarComponent';
import ItemListComponent from '../components/ItemListComponent';
import data from '../data';

function MyAuctionsPage() {
  return (
<div className='Page'>
    <div><LogoBarComponent/></div>
    <div style={{marginTop: '5em'}}>
      <ItemListComponent products={data.productsData} /> {/* Poprawiono przekazanie danych */}
  </div>
  </div>
);
  
}

export default MyAuctionsPage