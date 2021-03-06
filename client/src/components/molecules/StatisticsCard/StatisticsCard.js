import * as React from 'react';
import { Statistic } from './StatisticsCard.styles';

export const StatisticsCard = ({ statistic }) => {
  return (
    <Statistic
      title={statistic.name}
      value={statistic.value}
    />
  );
};
