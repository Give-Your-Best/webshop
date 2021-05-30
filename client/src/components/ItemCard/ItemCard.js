import * as React from 'react';
import styled from 'styled-components';
import { Card as AntCard } from 'antd';

const { Meta } = AntCard;

export const ItemCard = ({ item }) => (
  <Card
    hoverable
    cover={
      item.photos.front ? <img alt={item.name} src={item.photos.front} /> : null
    }
  >
    <Meta title={item.name} description={`UK size: ${item.size?.UK || '-'}`} />
  </Card>
);

const Card = styled(AntCard)`
  flex: 1;
  max-width: 13rem;
  min-width: 13rem;
  margin: 1rem;
  border-radius: 0.4rem;

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
