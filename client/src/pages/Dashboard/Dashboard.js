import * as React from 'react';
import { Container } from '../../components';
import { DashboardTabs } from '../../components/';

export const Dashboard = () => {

  return (
    <Container data-testid="Dashboard">
        <h2>Dashboard</h2>
        <DashboardTabs />
    </Container>
  );
};
