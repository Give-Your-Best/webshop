import styled from 'styled-components';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';

const StyledTabs = styled(Tabs)`
  background: white;
  display: block;
  width: 100%;
`;


const StyledTabList = styled(TabList)`
  padding: 0;
  margin: 2em 0;
  border-bottom: 1px solid ${({ theme }) => theme.colorMappings.borders};
  display: flex;
  width: 100%;
`;

const StyledTab = styled(Tab).attrs({
  selectedClassName: 'selected',
  disabledClassName: 'disabled'
})`
  flex-grow: 1;
  text-align: center;
  padding: 0.4em 1em;
  list-style: none;
  cursor: pointer;
  color: #888;
  max-width: max-content;

  &.selected {
    color: ${({ theme }) => theme.colorMappings.black};
    background: #CCC;
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
  border-left: 1px solid ${({ theme }) => theme.colorMappings.borders};
  border-bottom: 1px solid ${({ theme }) => theme.colorMappings.borders};

  &.selected {
    color: ${({ theme }) => theme.colorMappings.primary};
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

const ListWrapper = styled.div`
  width: 100%;
`

export { ListWrapper, StyledTab, StyledTabList, StyledTabs, StyledTabPanel, HiddenStyledTab };
