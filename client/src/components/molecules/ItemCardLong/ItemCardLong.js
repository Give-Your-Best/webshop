import * as React from 'react';
import { CardLong, CardLongImage } from './ItemCardLong.styles';
import { Card as AntCard } from 'antd';

const { Meta } = AntCard;

export const ItemCardLong = ({ item }) => {
  const frontPhoto =
    item.photos.length > 0 &&
    item.photos.find((photo) => (photo.front ? photo : null));
  const colours = item.colors.map(function(colour) {
    return ' ' + colour;
  });

  return (
    <CardLong
      cover={
        frontPhoto ? (
          <CardLongImage alt={`front of ${item.name}`} src={frontPhoto.src} width='200' />
        ) : null
      }
    >
      <Meta
        title={item.name}
        description={item.description}
      />
      <p>{`Brand: ${item.brand}`}</p>
      <p>{`Colours: ${colours}`}</p>
    </CardLong>
  );
};
