import React from 'react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const images = [
  {
    original: 'https://via.placeholder.com/600/92c952',
    thumbnail: 'https://via.placeholder.com/150/92c952',
  },
  {
    original: 'https://via.placeholder.com/600/771796',
    thumbnail: 'https://via.placeholder.com/150/771796',
  },
  // Dodaj więcej obrazków w odpowiednim formacie
];

function MyGallery() {
  const galleryOptions = {
    showPlayButton: false, // Ukryj przycisk autoprzesuwania
  };

  return (
    <div>
      <Gallery items={images} {...galleryOptions} />
    </div>
  );
}

export default MyGallery;