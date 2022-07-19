import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { CardLongWithBackground, CardLongImageWithBackground } from './ItemCardBasket.styles';
import { Card as AntCard } from 'antd';
import { Button } from '../../atoms';
import { trunc } from '../../../utils/helpers';

const { Meta } = AntCard;

export const ItemCardBasket = ({ item, actionText, action }) => {
  let history = useHistory();

  return (
    <CardLongWithBackground
      hoverable
      onClick={() => history.push(`/item/${item._id}`)}
      cover={
        <CardLongImageWithBackground alt={`front of ${item.name}`} src={(item.photos.length)? item.photos[0].url: ''} width='200' />
      }
    >
      <Meta bordered={'false'}
        title={item.name}
        description={trunc(item.description)}
      />
      {actionText && <Button primary small onClick={(e) => {e.stopPropagation();action(item._id)}}>{actionText}</Button>}
    </CardLongWithBackground>
  );
};
