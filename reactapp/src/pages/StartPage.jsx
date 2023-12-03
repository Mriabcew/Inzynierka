import React from 'react';
import CategoriesComponent from '../components/CategoriesComponent';
import data from '../data';
import ItemListComponent from '../components/ItemListComponent';
import LogoBarComponent from '../components/LogoBarComponent';

function StartPage() {
  return (
    <div className='Page'>
      <div><LogoBarComponent/></div>
      <div>
        <CategoriesComponent categories={data.categories} /> {/* Poprawiono przekazanie danych */}
      </div>
      <div>
        <ItemListComponent products={data.productsData} /> {/* Poprawiono przekazanie danych */}
      </div>
    </div>
  );
}

export default StartPage;
