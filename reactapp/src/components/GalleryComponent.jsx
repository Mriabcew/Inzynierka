import React from 'react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

function GalleryComponent({ images }) {
  const convertToImageObject = (image) => ({
    original: image.base64,
    thumbnail: image.base64,
  });

  const convertedImages = images.map(convertToImageObject);

  const galleryOptions = {
    showPlayButton: false,
    thumbnailPosition: 'bottom',
  };

  const imageStyles = {
    maxWidth: '500px',
    maxHeight: '500px', 
  };

  const thumbnailStyles = {
    width: '100px',
    height: 'auto',
  };

  return (
    <div>
      <Gallery items={convertedImages} {...galleryOptions} />
      <style>{`
        .image-gallery-image {
          ${Object.entries(imageStyles).map(([key, value]) => `${key}:${value};`).join('')}
        }
        .image-gallery-thumbnail-image {
          ${Object.entries(thumbnailStyles).map(([key, value]) => `${key}:${value};`).join('')}
        }
      `}</style>
    </div>
  );
}

export default GalleryComponent;
