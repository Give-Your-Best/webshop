import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from '../../../../context/app-context';
import { StatisticsCard, UsersChart, ItemsChart, Space } from '../../../atoms';
import { StatsTopWrapper } from './Statistics.styles';
import { getStatistics } from "../../../../services/statistics";

export const Statistics = () => {
  const { token } = useContext(AppContext);
  const mountedRef = useRef(true);
  const [stats, setStats] = useState({});

    useEffect(() => {
      console.log('load stats');

      const fetchStats = async () => {
        const statistics = await getStatistics(token);
        if (!mountedRef.current) return null;
        console.log(statistics)
        setStats(statistics);
      }

      fetchStats();
  
      return () => {
        // cleanup
        mountedRef.current = false;
      };

    }, [token]);

  return (
    <>
      <StatsTopWrapper>
        <StatisticsCard name={'Items in Shop'} value={stats.itemsInShop} />
        <StatisticsCard name={'Orders Today'} value={stats.ordersToday} />
        <StatisticsCard name={'Donations Today'} value={stats.donationsToday} />
      </StatsTopWrapper>
        <UsersChart stats={stats.usersChart} />
        <Space />
        <ItemsChart stats={stats.itemsChart} />
    </>
  );
};