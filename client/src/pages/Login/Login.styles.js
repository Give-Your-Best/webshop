import styled from 'styled-components';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';

const StyledTabs = styled(Tabs)`
    background: white;
    display: block;
    width: 100%;
    max-width: 600px;
    margin: auto;
    padding: 1em;
    border: 1px solid ${({ theme }) => theme.colorMappings.borders};
    border-radius: 10px;
`;

const StyledTabList = styled(TabList)`
  padding: 0;
  margin: 2em 0;
  justify-content: center;
  display: flex;
  width: 100%;
`;

const StyledTab = styled(Tab)`
  text-align: center;
  padding: 0.4em 1em;
  list-style: none;
  cursor: pointer;
  color: #888;
  max-width: max-content;
  padding: 0 3em;
  font-size: 24px;

  :last-child {
      border-left: 1px solid ${({ theme }) => theme.colorMappings.borders};
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

const HiddenStyledTab = styled(Tab)`
    display:none;
  `;

StyledTab.tabsRole = 'Tab';
StyledTabs.tabsRole = 'Tabs';
StyledTabPanel.tabsRole = 'TabPanel';
StyledTabList.tabsRole = 'TabList';

const SignUpWrapper = styled.div`
  display:flex;
  justify-content: center;
`

const SignUpHeading = styled.h2`
  text-align:center;
`

export { 
    StyledTab, 
    StyledTabList, 
    StyledTabs, 
    StyledTabPanel, 
    SignUpWrapper, 
    SignUpHeading,
    HiddenStyledTab
};
