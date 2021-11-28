import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Card as AntCard } from 'antd';
import { Card } from './ItemCard.styles';

const { Meta } = AntCard;

export const ItemCard = ({ item }) => {
  let history = useHistory();
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
      onClick={() => history.push(`/item/${item._id}`)}
    >
      <Meta
        title={item.name}
        description={`UK size: ${item.size?.UK || '-'}`}
      />
    </Card>
  );
};
