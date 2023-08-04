import * as React from 'react';
import { ImagesWrapper, MiniImagesWrapper } from './ImageGallery.styles';

const setImageSrc = (data) =>
  data && data.url
    ? data.url.replace('http://', 'https://')
    : '/product-placeholder.jpeg';

export const ImageGallery = ({ changeMainImage, mainImage, otherImages }) => {
  return (
    <ImagesWrapper>
      <MiniImagesWrapper>
        {otherImages.map((image) => (
          <img
            key={image._id}
            onClick={changeMainImage}
            data-id={image._id}
            alt={`other images`}
            src={setImageSrc(image)}
          />
        ))}
      </MiniImagesWrapper>
      <img alt={`main`} src={setImageSrc(mainImage)} />
    </ImagesWrapper>
  );
};
