import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoriesComponent from '../components/CategoriesComponent';
import ItemListComponent from '../components/ItemListComponent';
import LogoBarComponent from '../components/LogoBarComponent';
import { useParams } from 'react-router-dom';

function StartPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
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
    // Ustawienie wybranej kategorii na podstawie parametru z adresu URL
    setSelectedCategory(categoryId);
  }, [categoryId]);

  useEffect(() => {
    // Sprawdzenie, czy już są dostępne produkty dla danej kategorii
    if (categoryId) {
      const apiUrl = `https://localhost:7211/Auction/GetAllByCategory/${categoryId}`;

      axios.get(apiUrl)
        .then(response => {
          const sortedProducts = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
          setProducts(sortedProducts);
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych:', error);
        });
    }
  }, [categoryId]);

  return (
    <div className='Page'>
      <div><LogoBarComponent /></div>
      <div>
        <CategoriesComponent categories={categories} />
      </div>
      <div>
        <ItemListComponent key={categoryId} products={products} selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}

export default StartPage;
