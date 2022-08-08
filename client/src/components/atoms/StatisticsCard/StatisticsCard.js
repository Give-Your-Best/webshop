import * as React from 'react';
import { Statistic } from './StatisticsCard.styles';

export const StatisticsCard = ({ name, value }) => {
  return (
    <Statistic
      title={value}
      value={name}
    />
  );
};
