import styled from 'styled-components';
import { Alert } from 'antd';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';

const StyledAlert = styled(Alert)`
  border: none;

  .ant-alert-message,
  .ant-alert-description {
    font-size: 20px;
    font-weight: bold;
  }

  > * {
    margin: 0.5rem;
  }
`;

const StyledTabs = styled(Tabs)`
  background: ${({ theme }) => theme.colorMappings.background};
  display: block;
  width: 100%;
  font-family: lato;
`;

const StyledTabListHidden = styled(TabList)`
  padding: 0;
  margin: 0;
  width: 100%;
`;

const StyledTabList = styled(TabList)`
  padding: 0;
  margin: 2em 0;
  border-bottom: 2px solid ${({ theme }) => theme.colorMappings.borders};
  display: flex;
  width: 100%;
`;

const StyledTab = styled(Tab).attrs({
  selectedClassName: 'selected',
  disabledClassName: 'disabled',
})`
  flex-grow: 1;
  text-align: center;
  padding: 0.4em 1em;
  list-style: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colorMappings.primary};
  max-width: max-content;
  font-size: 22px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 18px;
  }

  &.selected {
    color: ${({ theme }) => theme.colorMappings.white};
    background: ${({ theme }) => theme.colorMappings.primary};
  }

  &.disabled {
    color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const HiddenStyledTab = styled(Tab).attrs({
  selectedClassName: 'selected',
  disabledClassName: 'disabled',
})`
  display: none;
  flex-grow: 1;
  text-align: center;
  padding: 1em;
  list-style: none;
  cursor: pointer;
  color: #888;
  border-left: 2px solid ${({ theme }) => theme.colorMappings.borders};
  border-bottom: 2px solid ${({ theme }) => theme.colorMappings.borders};

  &.selected {
    color: ${({ theme }) => theme.colorMappings.primary};
  }

  &.disabled {
    color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const StyledTabPanel = styled(TabPanel).attrs({
  selectedClassName: 'selected',
})`
  display: none;
  width: 100%;
  padding: 10px 20px;
  &.selected {
    display: block;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0px 2px;
  }
`;

StyledTab.tabsRole = 'Tab';
StyledTabs.tabsRole = 'Tabs';
StyledTabPanel.tabsRole = 'TabPanel';
StyledTabList.tabsRole = 'TabList';

const ListWrapper = styled.div`
  width: 100%;
`;

export {
  ListWrapper,
  StyledAlert,
  StyledTab,
  StyledTabList,
  StyledTabs,
  StyledTabPanel,
  HiddenStyledTab,
  StyledTabListHidden,
};
