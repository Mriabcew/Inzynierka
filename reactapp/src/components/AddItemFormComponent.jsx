import React, { useState, useEffect } from 'react';

function AddItemFormComponent() {
  const [name, setItemName] = useState('');
  const [description, setItemDescription] = useState('');
  const [price, setItemPrice] = useState('');
  const [condition, setItemCondition] = useState('');
  const [categoryId, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Pobierz listę kategorii z endpointu
    fetch('https://localhost:7211/Category/GetAll')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));

    // Pobierz userId z local storage
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId || ''); // Ustaw userId lub pusty ciąg znaków, jeśli nie ma takiego klucza w local storage
  }, []);

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleItemDescriptionChange = (e) => {
    setItemDescription(e.target.value);
  };

  const handleItemPriceChange = (e) => {
    setItemPrice(e.target.value);
  };

  const handleItemConditionChange = (e) => {
    setItemCondition(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('condition', condition);
    formData.append('categoryId', categoryId);
    formData.append('userId', userId);

    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    try {
      const response = await fetch('https://localhost:7211/Auction/AddNew', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Item added successfully!');
      } else {
        console.error('Failed to add item. Server returned:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error.message);
    }
  };

  

  return (
    <div style={{ height: 'calc(100vh - 115px)' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '20px',
          backgroundColor: '#282F44',
          color: '#E6AF2E',
          borderRadius: '10px',
          margin: '20px',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: '1em',
        }}
      >
        <h2
          style={{
            margin: '0',
            gridArea: '1/1/2/3',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Dodaj przedmiot na sprzedaż
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="itemName" style={{ paddingTop: '20px' }}>
            Nazwa przedmiotu:
          </label>
          <input
            style={{
              marginTop: '1em',
              padding: '8px',
              border: '1px solid #E6AF2E',
              borderRadius: '5px',
              backgroundColor: '#282F44',
              color: '#E6AF2E',
            }}
            type="text"
            id="itemName"
            value={name}
            onChange={handleItemNameChange}
            required
          />

<label htmlFor="itemCategory" style={{ paddingTop: '20px' }}>
            Kategoria:
          </label>
          <select
            style={{
              marginTop: '1em',
              padding: '8px',
              border: '1px solid #E6AF2E',
              borderRadius: '5px',
              backgroundColor: '#282F44',
              color: '#E6AF2E',
            }}
            id="itemCategory"
            value={categoryId}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Wybierz kategorię</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          

          <label htmlFor="itemDescription" style={{ paddingTop: '20px' }}>
            Opis przedmiotu:
          </label>
          <textarea
            style={{
              marginTop: '1em',
              padding: '8px',
              border: '1px solid #E6AF2E',
              borderRadius: '5px',
              backgroundColor: '#282F44',
              color: '#E6AF2E',
              resize: 'none',
              height: '400px',
            }}
            id="itemDescription"
            value={description}
            onChange={handleItemDescriptionChange}
            required
          ></textarea>

          <label htmlFor="itemPrice" style={{ paddingTop: '20px' }}>
            Cena:
          </label>
          <input
            style={{
              marginTop: '1em',
              padding: '8px',
              border: '1px solid #E6AF2E',
              borderRadius: '5px',
              backgroundColor: '#282F44',
              color: '#E6AF2E',
            }}
            type="text"
            id="itemPrice"
            value={price}
            onChange={handleItemPriceChange}
            required
          />

          <label htmlFor="itemCondition" style={{ paddingTop: '20px' }}>
            Stan przedmiotu:
          </label>
          <select
            style={{
              marginTop: '1em',
              padding: '8px',
              border: '1px solid #E6AF2E',
              borderRadius: '5px',
              backgroundColor: '#282F44',
              color: '#E6AF2E',
            }}
            id="itemCondition"
            value={condition}
            onChange={handleItemConditionChange}
            required
          >
            <option value="">Wybierz stan</option>
            <option value="Nowy">Nowy</option>
            <option value="Używany">Używany</option>
          </select>
        </div>
        <div style={{ overflow: 'auto', maxHeight: '800px' }}>
          <label htmlFor="images" style={{ paddingTop: '20px' }}>
            Przeciągnij zdjęcia albo kliknij, aby wybrać:
          </label>
          <input type="file" multiple onChange={handleImageChange} />
          <div style={{ display: 'grid' }}>
            {images.map((image, index) => (
              <div key={index} className="image-item" style={{ marginTop: '1em' }}>
                <img src={URL.createObjectURL(image)} alt="" width="500" />
                <div
                  className="image-item__btn-wrapper"
                  style={{
                    display: 'flex',
                    alignContent: 'center',
                  }}
                >
                  <button
                    style={{
                      padding: '5px',
                      backgroundColor: '#E6AF2E',
                      color: '#282F44',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: '5px',
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          style={{
            marginTop: '1em',
            padding: '10px',
            backgroundColor: '#E6AF2E',
            color: '#282F44',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            gridArea: '7/1/7/3',
          }}
        >
          Dodaj przedmiot
        </button>
      </form>
    </div>
  );
}

export default AddItemFormComponent;
