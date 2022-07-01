import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../components';
import { DashboardTabs } from '../../components/';

export const Dashboard = () => {
  const { itemId } = useParams();
  console.log(itemId);

  return (
    <Container data-testid="Dashboard">
        <DashboardTabs itemId={itemId} />
    </Container>
  );
};
