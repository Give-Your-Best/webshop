import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../components';
import { DashboardTabs } from '../../components/';
import { SocketProvider } from '../../context/socket-context';

export const Dashboard = () => {
  const { itemId } = useParams();

  return (
    <Container data-testid="Dashboard">
      <SocketProvider>
        <DashboardTabs itemId={itemId} />
      </SocketProvider>
    </Container>
  );
};
