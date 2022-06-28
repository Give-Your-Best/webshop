import * as React from 'react';
import { CardLong, CardLongImage } from './ItemCardLong.styles';
import { Card as AntCard } from 'antd';
import { Button } from '../../atoms';
import { ProgressBar } from '../../atoms/ProgressBar/ProgressBar';

const { Meta } = AntCard;

export const ItemCardLong = ({ item, actionText, action, type }) => {
  return (
    <CardLong
      cover={
        <CardLongImage alt={`front of ${item.name}`} src={(item.photos.length)? item.photos[0].url: ''} width='200' />
      }
    >
      <Meta
        title={item.name}
        description={item.description}
      />
      {(type)? <ProgressBar type={type} status={item.status} />: ''}
      {actionText && <Button primary small onClick={() => {action(item._id)}}>{actionText}</Button>}
    </CardLong>
  );
};
