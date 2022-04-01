import * as React from 'react';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, DashboardMenuWrapper } from './Tabs.styles';
import { Statistics } from '../Statistics';
import { Users } from '../Users';
import { Notifications } from '../Notifications';
import { ApproveRequests } from '../AprroveRequests/ApproveRequests';
import { ShippingLocations } from '../ShippingLocations/ShippingLocations';
import { Logout } from '../../Logout/Logout';

export const Tabs = () => {
  return (
    <DashboardMenuWrapper>
      <StyledTabs>
        <StyledTabList>
          <StyledTab>Dashboard</StyledTab>
          <StyledTab>Users</StyledTab>
          <StyledTab>Messaging</StyledTab>
          <StyledTab>Notifications</StyledTab>
          <StyledTab>Approve Requests</StyledTab>
          <StyledTab>Shipping Locations</StyledTab>
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
          <Notifications />
        </StyledTabPanel>
        <StyledTabPanel>
          <ApproveRequests />
        </StyledTabPanel>
        <StyledTabPanel>
          <ShippingLocations />
        </StyledTabPanel>
        <StyledTabPanel>
          <h2>Settings</h2>
        </StyledTabPanel>
        <StyledTabPanel>
          <Logout />
        </StyledTabPanel>
      </StyledTabs>
    </DashboardMenuWrapper>
  );
};
