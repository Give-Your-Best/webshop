import React, { useContext } from "react";
import { AppContext } from '../../../../context/app-context';
import { 
  StyledTab, 
  StyledTabList, 
  StyledTabs, 
  StyledTabPanel, 
  DashboardMenuWrapper, 
  StyledTabPanelDashboardImage,
  StyledTabHidden
} from './Tabs.styles';
import { AccountWelcome } from '../../../molecules/AccountWelcome';
import { adminTabs, donorTabs, shopperTabs } from './constants';

export const Tabs = () => {
  const { user } = useContext(AppContext);
  var tabs = [];

  switch (user.type) {
    default:
      tabs = [];
      break;
    case 'admin':
      tabs = adminTabs;
      break;
    case 'donor':
      tabs = donorTabs;
      break;
    case 'shopper':
      tabs = shopperTabs;
      break;
  }
  return (
    <DashboardMenuWrapper>
      <StyledTabs>
        <StyledTabList>
          <AccountWelcome />
          {tabs.map((d)=>{
            return (
              (d.name === 'Dashboard')? <StyledTabHidden key={d.name}>{d.name}</StyledTabHidden>
              : <StyledTab key={d.name}>{d.name}</StyledTab>
            )
          })}
        </StyledTabList>
      
        {tabs.map((d)=>{
            return (
              (d.name === 'Dashboard')? <StyledTabPanelDashboardImage key={d.name}>{d.content}</StyledTabPanelDashboardImage>
              : <StyledTabPanel key={d.name}>{d.content}</StyledTabPanel>
            )
          })}
      </StyledTabs>
    </DashboardMenuWrapper>
  );
};
