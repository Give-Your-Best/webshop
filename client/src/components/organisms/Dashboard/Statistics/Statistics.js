import * as React from 'react';
import { StatisticsCard } from '../../../molecules';

export const Statistics = () => {
  const ordersToday = {
      name: "Orders Today",
      value: 12
  }
  const newSignUps = {
    name: "New Sign Ups",
    value: 10
    }
  return (
      <div>
        <small>Currently static api still to be built</small>
        <StatisticsCard statistic={ordersToday} />
        <StatisticsCard statistic={newSignUps} />
      </div>
  );
};
