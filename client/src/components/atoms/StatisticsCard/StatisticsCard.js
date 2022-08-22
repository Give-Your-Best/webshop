import * as React from 'react';
import { Statistic } from './StatisticsCard.styles';

export const StatisticsCard = ({ name, value }) => {
  return (
    <Statistic
      title={value.toString()} //requied tostring for 0 scenario
      value={name}
    />
  );
};
