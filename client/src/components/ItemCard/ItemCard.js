import * as React from 'react';
import styled from 'styled-components';
import { Card as AntCard } from 'antd';

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

const Card = styled(AntCard)`
  flex: 1;
  max-width: 13rem;
  min-width: 13rem;
  margin: 1rem;

  @media (max-width: 768px) {
    margin: 0.5rem 0.3rem;
    max-width: 9rem;
    min-width: 9rem;

    .ant-card-meta-title {
      font-size: 14px;
    }
    .ant-card-meta-description {
      font-size: 10px;
    }
  }
`;
