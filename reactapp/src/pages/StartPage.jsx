import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoriesComponent from '../components/CategoriesComponent';
import ItemListComponent from '../components/ItemListComponent';
import LogoBarComponent from '../components/LogoBarComponent';
import { useParams } from 'react-router-dom';

function StartPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    if (!products || products.length === 0) {
      const apiUrl = categoryId
        ? `https://localhost:7211/Auction/GetAllByCategory/${categoryId}`
        : 'https://localhost:7211/Auction/GetAll';

      axios.get(apiUrl)
        .then(response => {
          const products = response.data;
          setProducts(products);
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych:', error);
        });
    }
  }, [categoryId, products]);


  useEffect(() => {
    setSelectedCategory(categoryId);
    console.log(categoryId);
  }, [categoryId]);

  return (
    <div className='Page'>
      <div>
        <LogoBarComponent />
      </div>
      <div>
        <CategoriesComponent categories={categories} />
      </div>
      <div>
        {selectedCategory ? (
          <ItemListComponent products={products} />
        ) : (
          <ItemListComponent products={products || []} selectedCategory={selectedCategory} />
        )}
      </div>
    </div>
  );
}

export default StartPage;