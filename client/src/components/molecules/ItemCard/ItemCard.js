import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Card as AntCard } from 'antd';
import { Card } from './ItemCard.styles';

const { Meta } = AntCard;

export const ItemCard = ({ item }) => {
  let history = useHistory();
  return (
    <Card
      hoverable
      cover={
        <img alt={`front of ${item.name}`} src={item.photos[0].url} />
      }
      onClick={() => history.push(`/item/${item._id}`)}
    >
      <Meta
        title={item.name}
        description={item.description}
      />
    </Card>
  );
};
