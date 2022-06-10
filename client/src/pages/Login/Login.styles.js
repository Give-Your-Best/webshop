import styled from 'styled-components';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import { Form } from 'formik-antd';

const StyledForm = styled(Form)`
  width: 400px;
  margin: auto;
`

const StyledTabs = styled(Tabs)`
    background: ${({ theme }) => theme.colorMappings.background};
    display: block;
    width: 100%;
    max-width: 700px;
    margin: auto;
    padding: 1em 5em 5em 5em;
    border: 2px solid ${({ theme }) => theme.colorMappings.borders};
    border-radius: 30px;
    font-family: lato;
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
  max-width: max-content;
  padding: 0 3em;
  font-size: 30px;
  color:  ${({ theme }) => theme.colorMappings.primary};
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

const SignUpStyledTab = styled(Tab)`
  text-align: center;
  padding: 0.4em 1em;
  list-style: none;
  cursor: pointer;
  color:  ${({ theme }) => theme.colorMappings.primary};
  max-width: max-content;
  padding: 0 3em;
  font-size: 30px;
  border-right: 2px solid ${({ theme }) => theme.colorMappings.borders};
`;

export { 
    StyledTab, 
    StyledTabList, 
    StyledTabs, 
    StyledTabPanel, 
    SignUpWrapper, 
    SignUpStyledTab,
    HiddenStyledTab,
    StyledForm
};
