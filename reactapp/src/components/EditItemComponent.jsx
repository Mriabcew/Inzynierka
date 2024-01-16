import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditItemFormComponent() {
  const { itemId } = useParams();
  const [name, setItemName] = useState('');
  const [description, setItemDescription] = useState('');
  const [price, setItemPrice] = useState('');
  const [condition, setItemCondition] = useState('');
  const [categoryId, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetch('https://localhost:7211/Category/GetAll')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));

    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId || '');

    fetch(`https://localhost:7211/Auction/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        setItemName(data.name);
        setItemDescription(data.description);
        setItemPrice(data.price);
        setItemCondition(data.condition);
        setCategory(data.categoryId);
        setExistingImages(data.images);
      })
      .catch((error) => console.error('Error fetching auction data for edit:', error));
  }, [itemId]);

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

  const handleRemoveExistingImage = (index) => {
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const convertImageToBase64 = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(imageFile);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newImagePromises = images.map(async (image) => ({
      name: image.name,
      base64: await convertImageToBase64(image),
      extension: 'jpg',
    }));

    const combinedImages = [
      ...existingImages,
      ...(await Promise.all(newImagePromises)),
    ];

    const auctionModel = {
      id: itemId,
      name,
      description,
      price,
      categoryId,
      userId,
      images: combinedImages
    };

    try {
      const response = await fetch(`https://localhost:7211/Auction/Edit/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auctionModel),
      });

      if (response.ok) {
        console.log('Item edited successfully!');
      } else {
        console.error('Failed to edit item. Server returned:', response.status, response.statusText);
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
          Edytuj przedmiot na sprzedaż
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
                <img src={image instanceof File ? URL.createObjectURL(image) : image} alt="" width="500" />
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
            {existingImages.map((image, index) => (
              <div key={index} className="image-item" style={{ marginTop: '1em' }}>
                <img src={image.base64} alt="" width="500" />
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
                    onClick={() => handleRemoveExistingImage(index)}
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
          Zapisz zmiany
        </button>
      </form>
    </div>
  );
}

export default EditItemFormComponent;
