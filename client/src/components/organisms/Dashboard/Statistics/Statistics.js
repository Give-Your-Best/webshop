import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from '../../../../context/app-context';
import { StatisticsCard, UsersChart, ItemsChart, Space } from '../../../atoms';
import { StatsTopWrapper } from './Statistics.styles';
import { getStatistics } from "../../../../services/statistics";
import { tabList } from "../../../../utils/helpers";

export const Statistics = () => {
  const { token, user } = useContext(AppContext);
  const mountedRef = useRef(true);
  const [stats, setStats] = useState({});

    useEffect(() => {
      //add to url history (added for back button to work)
      var tabs = tabList(user);
      tabs.forEach((t) => {
        if (t.id === 'adminSettings') {
          window.history.pushState({}, '','/dashboard/' + t.id)
        }
      })

      const fetchStats = async () => {
        const statistics = await getStatistics(token);
        if (!mountedRef.current) return null;
        setStats(statistics);
      }

      fetchStats();
  
      return () => {
        // cleanup
        mountedRef.current = false;
      };

    }, [token, user]);

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