import React from 'react'
import { useParams } from 'react-router-dom';

function ItemPage() {
  const { itemId } = useParams();

  return (
      <div>
        <h2>Strona przedmiotu o ID: {itemId}</h2>
        {/* Dodaj logikę wyświetlania informacji o przedmiocie o określonym ID */}
      </div>
  )
}

export default ItemPage