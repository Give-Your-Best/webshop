import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  CardLongWithBackground,
  CardLongImageWithBackground,
} from './ItemCardBasket.styles';
import { Card as AntCard } from 'antd';
import { Button } from '../../atoms';
import { trunc } from '../../../utils/helpers';

const { Meta } = AntCard;

export const ItemCardBasket = ({ item, actionText, action }) => {
  let history = useHistory();
  const [displaySizes, setDisplaySizes] = useState([]);

  useEffect(() => {
    if (item.shoeSize && item.shoeSize.length > 0) {
      setDisplaySizes(item.shoeSize);
    } else if (item.clothingSize && item.clothingSize.length > 0) {
      setDisplaySizes(item.clothingSize);
    }
  }, [item.shoeSize, item.clothingSize]);

  return (
    <CardLongWithBackground
      hoverable
      onClick={() => history.push(`/item/${item._id}`)}
      cover={
        <CardLongImageWithBackground
          alt={`front of ${item.name}`}
          src={item.photos.length ? item.photos[0].url : ''}
          width="200"
        />
      }
    >
      <Meta
        bordered={'false'}
        title={item.name}
        description={
          <>
            {trunc(item.description)}
            <br />
            size {displaySizes.join(', ')}
          </>
        }
      />
      {actionText && (
        <Button
          primary
          small
          onClick={(e) => {
            e.stopPropagation();
            action(item._id);
          }}
        >
          {actionText}
        </Button>
      )}
    </CardLongWithBackground>
  );
};
