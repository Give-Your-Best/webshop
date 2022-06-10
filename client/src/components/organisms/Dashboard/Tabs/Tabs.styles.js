import styled from 'styled-components';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';

const DashboardMenuWrapper = styled.div`
  width: 100%;
`;

const StyledTabs = styled(Tabs)`
  background: ${({ theme }) => theme.colorMappings.background};
  display: flex;
  font-family: lato;
  bakground: ${({ theme }) => theme.colorMappings.background};
`;

const StyledTabList = styled(TabList)`
  padding: 0;
  margin: 0;
  border: none;
`;

const StyledTab = styled(Tab).attrs({
  selectedClassName: 'selected',
  disabledClassName: 'disabled'
})`
  flex-grow: 1;
  text-align: center;
  padding: 1em;
  list-style: none;
  cursor: pointer;
  color: #888;
  border: 2px solid ${({ theme }) => theme.colorMappings.borders};
  margin: 1em 0;
  min-width: 200px;

  &.selected {
    color: ${({ theme }) => theme.colorMappings.primary};
  }

  &.disabled {
    color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const StyledTabHidden = styled(Tab)`
  display: none;
`;

const StyledTabPanel = styled(TabPanel).attrs({ selectedClassName: 'selected' })`
  &.selected {
    padding: 2em;
    width: 100%;
    margin: 0 3em;
    display: block;
    border: 2px solid ${({ theme }) => theme.colorMappings.borders};
  }
`;

const StyledTabPanelDashboardImage = styled(TabPanel).attrs({ selectedClassName: 'selected' })`
  &.selected {
    width: 100%;
    margin: 0 3em;
    display: block;
    border: 2px solid ${({ theme }) => theme.colorMappings.borders};
  }
`;

StyledTab.tabsRole = 'Tab';
StyledTabs.tabsRole = 'Tabs';
StyledTabPanel.tabsRole = 'TabPanel';
StyledTabList.tabsRole = 'TabList';

export { 
  StyledTab, 
  StyledTabList, 
  StyledTabs, 
  StyledTabPanel, 
  DashboardMenuWrapper, 
  StyledTabPanelDashboardImage,
  StyledTabHidden 
};