import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoriesComponent from '../components/CategoriesComponent';
import ItemListComponent from '../components/ItemListComponent';
import LogoBarComponent from '../components/LogoBarComponent';
import { useParams } from 'react-router-dom';

function StartPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [products, setProducts] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    // Pobranie danych z endpointu
    axios.get('https://localhost:7211/Category/GetAll')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych kategorii:', error);
      });
  }, []);

  useEffect(() => {
    // Jeśli nie przekazano listy produktów jako prop, pobierz je za pomocą endpointu
    if (!products || products.length === 0) {
      // Określenie odpowiedniego endpointu
      const apiUrl = categoryId
        ? `https://localhost:7211/Auction/GetAllByCategory/${categoryId}`
        : 'https://localhost:7211/Auction/GetAll';

      // Pobieranie danych z endpointu
      axios.get(apiUrl)
        .then(response => {
          const sortedProducts = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
          setProducts(sortedProducts);
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych:', error);
        });
    }
  }, [categoryId, products]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  useEffect(() => {
    // Ustawienie wybranej kategorii na podstawie parametru z adresu URL
    setSelectedCategory(categoryId);
    console.log(categoryId);
  }, [categoryId]);

  return (
    <div className='Page'>
      <div>
        <LogoBarComponent onSearchResults={handleSearchResults} />
      </div>
      <div>
        <CategoriesComponent categories={categories} />
      </div>
      <div>
        {searchResults ? (
          <ItemListComponent products={searchResults} />
        ) : (
          <ItemListComponent products={products || []} selectedCategory={selectedCategory} />
        )}
      </div>
    </div>
  );
}

export default StartPage;