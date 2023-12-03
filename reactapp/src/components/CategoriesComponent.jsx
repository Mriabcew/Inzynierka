import React from 'react'
import { Link } from 'react-router-dom';

import './CategoriesComponentStyle.css';

const CategoriesComponent = ({ categories }) => {
    return (
      <div className='categories-component'>
        <h2>Kategorie</h2>
        <ul className='category-list'>
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/kategoria/${category.name}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default CategoriesComponent