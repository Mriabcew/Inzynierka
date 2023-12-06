import React, { useState } from 'react';

function AddItemFormComponent() {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCondition, setItemCondition] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tutaj możesz umieścić logikę obsługi dodawania przedmiotu na sprzedaż
    console.log('Dodano przedmiot na sprzedaż:', {
      itemName,
      itemDescription,
      itemPrice,
      itemCondition,
    });
    // Poniżej dodaj kod do wysłania danych na serwer lub innej logiki
  };

  return (
    <div>
      <h2>Dodaj przedmiot na sprzedaż</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="itemName">Nazwa przedmiotu:</label>
        <input
          type="text"
          id="itemName"
          value={itemName}
          onChange={handleItemNameChange}
          required
        />

        <label htmlFor="itemDescription">Opis przedmiotu:</label>
        <textarea
          id="itemDescription"
          value={itemDescription}
          onChange={handleItemDescriptionChange}
          required
        ></textarea>

        <label htmlFor="itemPrice">Cena:</label>
        <input
          type="text"
          id="itemPrice"
          value={itemPrice}
          onChange={handleItemPriceChange}
          required
        />

        <label htmlFor="itemCondition">Stan przedmiotu:</label>
        <select
          id="itemCondition"
          value={itemCondition}
          onChange={handleItemConditionChange}
          required
        >
          <option value="">Wybierz stan</option>
          <option value="Nowy">Nowy</option>
          <option value="Używany">Używany</option>
        </select>

        <button type="submit">Dodaj przedmiot</button>
      </form>
    </div>
  );
}

export default AddItemFormComponent;
