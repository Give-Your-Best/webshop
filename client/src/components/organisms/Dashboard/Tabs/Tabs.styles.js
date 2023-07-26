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
  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;

const StyledTab = styled(Tab).attrs({
  selectedClassName: 'selected',
  disabledClassName: 'disabled',
})`
  flex-grow: 1;
  box-shadow: 0px 3px 6px #ba191a29;
  text-align: center;
  padding: 1em;
  list-style: none;
  cursor: pointer;
  color: #888;
  border: 2px solid ${({ theme }) => theme.colorMappings.borders};
  margin: 1em 0;
  min-width: 300px;
  border-radius: 20px;
  color: ${({ theme }) => theme.colorMappings.primary};
  font-size: 20px;
  font-family: lato;

  &.selected {
    background: ${({ theme }) => theme.colorMappings.yellow};
  }

  &.disabled {
    color: #e0e0e0;
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.mid}) {
    min-width: unset;
  }
`;

const StyledTabHidden = styled(Tab)`
  display: none;
`;

const StyledTabPanel = styled(TabPanel).attrs({
  selectedClassName: 'selected',
})`
  &.selected {
    padding: 2em;
    width: 100%;
    margin: 0 3em;
    display: block;
    border: 2px solid ${({ theme }) => theme.colorMappings.borders};
    border-radius: 30px;
  }

  @media (max-width: ${({ theme }) => theme.mid}) {
    &.selected {
      margin: 0 0 0 2em;
      padding: 0.75em;
    }
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    &.selected {
      margin: 0;
    }
  }
`;

const StyledTabPanelDashboardImage = styled(TabPanel).attrs({
  selectedClassName: 'selected',
})`
  &.selected {
    width: 100%;
    box-shadow: 0px 3px 6px #ba191a29;
    margin: 0 3em;
    display: block;
  }

  @media (max-width: ${({ theme }) => theme.mid}) {
    &.selected {
      margin: 0 0 0 2em;
    }
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    &.selected {
      margin: 0;
    }
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
  StyledTabHidden,
};
