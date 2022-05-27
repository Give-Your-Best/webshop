import * as React from 'react';
import { ImagesWrapper, MiniImagesWrapper } from './ImageGallery.styles';

export const ImageGallery = ({changeMainImage, mainImage, otherImages}) => {

    return (
    <ImagesWrapper>
        <MiniImagesWrapper>
        {otherImages.map((image) => (
            <img key={image._id} onClick={changeMainImage} data-id={image._id} alt={`other images`} src={image.url} />
        ))}
        </MiniImagesWrapper>
        <img alt={`main`} src={mainImage.url || '/product-placeholder.jpeg'} />
    </ImagesWrapper>
    );
};
