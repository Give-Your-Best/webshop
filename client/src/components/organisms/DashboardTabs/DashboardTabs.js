import * as React from 'react';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, DashboardMenuWrapper } from './DashboardTabs.styles';
import { Statistics } from '../Statistics';
import { Users } from '../Users';

export const DashboardTabs = () => {
  return (
    <DashboardMenuWrapper>
      <StyledTabs>
        <StyledTabList>
          <StyledTab>Dashboard</StyledTab>
          <StyledTab>Users</StyledTab>
          <StyledTab>Messaging</StyledTab>
          <StyledTab>Notifications</StyledTab>
          <StyledTab>Approve Requests</StyledTab>
          <StyledTab>Admin Shop</StyledTab>
          <StyledTab>Settings</StyledTab>
          <StyledTab>Logout</StyledTab>
        </StyledTabList>

        <StyledTabPanel>
          <Statistics />
        </StyledTabPanel>
        <StyledTabPanel>
          <Users />
        </StyledTabPanel>
        <StyledTabPanel>
          <h2>Messaging</h2>
        </StyledTabPanel>
        <StyledTabPanel>
          <h2>Notifications</h2>
        </StyledTabPanel>
        <StyledTabPanel>
          <h2>Approve requests</h2>
        </StyledTabPanel>
        <StyledTabPanel>
          <h2>Admin shop</h2>
        </StyledTabPanel>
        <StyledTabPanel>
          <h2>Settings</h2>
        </StyledTabPanel>
        <StyledTabPanel>
          <h2>Logout</h2>
        </StyledTabPanel>
      </StyledTabs>
    </DashboardMenuWrapper>
  );
};
