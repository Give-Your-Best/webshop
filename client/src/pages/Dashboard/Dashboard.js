import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../components';
import { DashboardTabs } from '../../components/';
import { AccountProvider } from '../../context/account-context';

export const Dashboard = () => {
  const { itemId } = useParams();

  return (
    <Container data-testid="Dashboard">
      <AccountProvider>
        <DashboardTabs itemId={itemId} />
      </AccountProvider>
    </Container>
  );
};
