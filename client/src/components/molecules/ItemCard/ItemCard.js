import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Card as AntCard } from 'antd';
import { Card } from './ItemCard.styles';
import { trunc } from '../../../utils/helpers';
import { Button } from '../../atoms/Button';

const { Meta } = AntCard;

export const ItemCard = ({ item }) => {
  let history = useHistory();
  return (
    <Card
      hoverable
      cover={
        <img alt={`front of ${item.name}`} src={(item.photos.length)? item.photos[0].url: ''} />
      }
      onClick={() => history.push(`/item/${item._id}`)}
    >
      <Meta
        title={item.name}
        description={trunc(item.description)}
      />
      <Button primary small right>Take a look ></Button>
    </Card>
  );
};
