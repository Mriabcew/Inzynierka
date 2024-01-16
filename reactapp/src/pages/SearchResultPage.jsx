import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogoBarComponent from '../components/LogoBarComponent';
import axios from 'axios';
import CategoriesComponent from '../components/CategoriesComponent';
import ItemListComponent from '../components/ItemListComponent';

function SearchResultPage() {
  const [categories, setCategories] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const { fraza } = useParams();
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get('https://localhost:7211/Category/GetAll')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych kategorii:', error);
      });
  }, []);

  useEffect(() => {
    setSearchPhrase(fraza);
  }, [fraza]);


  useEffect(() => {
      const apiUrl = 'https://localhost:7211/Auction/GetAll';
      axios.get(apiUrl)
        .then(response => {
          const products = response.data;
          setProducts(products);
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych:', error);
        });
    }
  );

  return (
    <div>
      <LogoBarComponent />
      
      <div>
        <CategoriesComponent categories={categories} />
      </div>
      <div>
       
          <ItemListComponent products={products.filter(p => p.name.toLowerCase().includes(searchPhrase.toLowerCase())
            ||
            p.description.toLowerCase().includes(searchPhrase.toLowerCase()
            ))} />
      </div>
      
    </div>
  );
}

export default SearchResultPage;
