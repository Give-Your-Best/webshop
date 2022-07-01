import * as React from 'react';
import { CardLong, CardLongImage } from './ItemCardLong.styles';
import { Card as AntCard } from 'antd';
import { Button } from '../../atoms';
import { ProgressBar } from '../../atoms/ProgressBar/ProgressBar';
import { trunc } from '../../../utils/helpers';

const { Meta } = AntCard;

export const ItemCardLong = ({ item, actionText, action, type, shippedDate }) => {
  return (
    <CardLong
      cover={
        <CardLongImage alt={`front of ${item.name}`} src={(item.photos.length)? item.photos[0].url: ''} width='200' />
      }
    >
      <Meta bordered={'false'}
        title={item.name}
        description={trunc(item.description)}
      />
      {(type)? <ProgressBar type={type} status={item.status} />: ''}
      {(shippedDate)? <span>{'Shipped on: ' +  shippedDate}</span>: ''}
      {actionText && <Button primary small onClick={() => {action(item._id)}}>{actionText}</Button>}
    </CardLong>
  );
};
