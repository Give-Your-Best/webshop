import styled from 'styled-components';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';

const StyledTabs = styled(Tabs)`
  background: white;
  display: block;
  width: 100%;
`;


const StyledTabList = styled(TabList)`
  padding: 0;
  margin: 0;
  border-right: 1px solid #e0e0e0;
  display: flex;
  width: 100%;
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
  border-left: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;

  &.selected {
    color: #0097ff;
  }

  &.disabled {
    color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const HiddenStyledTab = styled(Tab).attrs({
  selectedClassName: 'selected',
  disabledClassName: 'disabled'
})`
  display:none;
  flex-grow: 1;
  text-align: center;
  padding: 1em;
  list-style: none;
  cursor: pointer;
  color: #888;
  border-left: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;

  &.selected {
    color: #0097ff;
  }

  &.disabled {
    color: #e0e0e0;
    cursor: not-allowed;
  }
`;


const StyledTabPanel = styled(TabPanel).attrs({ selectedClassName: 'selected' })`
  display: none;
  width: 100%;
  padding: 10px 20px;
  &.selected {
    display: block;
  }
`;

StyledTab.tabsRole = 'Tab';
StyledTabs.tabsRole = 'Tabs';
StyledTabPanel.tabsRole = 'TabPanel';
StyledTabList.tabsRole = 'TabList';

export { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, HiddenStyledTab };