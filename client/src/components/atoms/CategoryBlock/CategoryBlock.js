import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Card as AntCard } from 'antd';
import { Card } from './CategoryBlock.styles';

const { Meta } = AntCard;

export const CategoryBlock = ({ category }) => {
  let history = useHistory();

  return (
    <Card
      cover={
        category.image ? (
          <img alt={`category ${category.name}`} src={category.image} />
        ) : null
      }
      onClick={() => history.push(`/products/women/${category.id}`)}
    >
      <Meta
        title={category.name}
      />
    </Card>
  );
};
