import React, { useContext } from "react";
import { AppContext } from '../../../../context/app-context';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, DashboardMenuWrapper } from './Tabs.styles';
import { AccountWelcome } from '../../../molecules/AccountWelcome';
import { adminTabs, donorTabs, shopperTabs } from './constants';

export const Tabs = () => {
  const { user } = useContext(AppContext);
  console.log(user);
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
            return (<StyledTab>{d.name}</StyledTab>);
          })}
        </StyledTabList>

        {tabs.map((d)=>{
            return (<StyledTabPanel>{d.content}</StyledTabPanel>);
          })}
      </StyledTabs>
    </DashboardMenuWrapper>
  );
};
