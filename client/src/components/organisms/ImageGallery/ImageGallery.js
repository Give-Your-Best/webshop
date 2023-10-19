import * as React from 'react';
import { ImagesWrapper, MiniImagesWrapper } from './ImageGallery.styles';

import { setImageSrc } from '../../../utils/helpers';

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
            src={setImageSrc(image, 'thumbUrl')}
          />
        ))}
      </MiniImagesWrapper>
      <img alt={`main`} src={setImageSrc(mainImage, 'mainUrl')} />
    </ImagesWrapper>
  );
};
