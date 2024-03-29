import styled from 'styled-components';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';

const ShopperWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colorMappings.secondary};
  border-radius: 10px;
  padding: 1em 1em 5em 1em;
  margin: 1em 0;
`;
const ShopperWrapperSmall = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colorMappings.secondary};
  border-radius: 10px;
  padding: 1em;
  margin: 1em 0;
`;

const ShopperName = styled.p`
  font-weight: bold;
`;

const StyledTabs = styled(Tabs)`
  background: ${({ theme }) => theme.colorMappings.background};
  display: block;
  width: 100%;
  font-family: lato;
`;

const StyledTabList = styled(TabList)`
  padding: 0;
  margin: 2em 0;
  border-bottom: 1px solid ${({ theme }) => theme.colorMappings.borders};
  display: flex;
  width: 100%;
`;

const StyledTabListHidden = styled(TabList)`
  padding: 0;
  margin: 0;
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

const InfoNote = styled.p`
  font-size: 20px !important;
  margin-bottom: 1em;
  color: ${({ theme }) => theme.colorMappings.primary};
  text-decoration: italic;
`;

export {
  ListWrapper,
  StyledTab,
  StyledTabList,
  StyledTabs,
  StyledTabPanel,
  HiddenStyledTab,
  StyledTabListHidden,
  InfoNote,
  ShopperWrapper,
  ShopperName,
  ShopperWrapperSmall,
};
