import * as React from 'react';
import { Card as AntCard } from 'antd';
import { Card } from './ItemCard.styles';

const { Meta } = AntCard;

export const ItemCard = ({ item }) => {
  const frontPhoto =
    item.photos.length > 0 &&
    item.photos.find((photo) => (photo.front ? photo : null));

  return (
    <Card
      hoverable
      cover={
        frontPhoto ? (
          <img alt={`front of ${item.name}`} src={frontPhoto.src} />
        ) : null
      }
    >
      <Meta
        title={item.name}
        description={`UK size: ${item.size?.UK || '-'}`}
      />
    </Card>
  );
};
