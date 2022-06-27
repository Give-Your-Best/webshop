import styled from 'styled-components';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import { Form } from 'formik-antd';

const StyledForm = styled(Form)`
  font-size: 20px;
  display: flex;
  color: ${({ theme }) => theme.colorMappings.primary};
`


const MessageSent = styled.div`
width: 100%;
display: flex;
justify-content: start;
  p {
    display: block;
    width: 45%;
    border: 1px solid ${({ theme }) => theme.colorMappings.borders};
    color: ${({ theme }) => theme.colorMappings.primary};
    padding: 10px;
    margin-bottom: 10px;
  }
`

const MessageReceived = styled.div`
width: 100%;
display: flex;
justify-content: end;
  p {
    display: block;
    width: 45%;
    border: 1px solid ${({ theme }) => theme.colorMappings.borders};
    color: ${({ theme }) => theme.colorMappings.primary};
    padding: 10px;
    margin-bottom: 10px;
  }
`

const MessagesContainer = styled.div`
  display: block;
  width: 100%;
  margin-top: 10px;
  max-height: 1000px;
  overflow: scroll;
  margin-bottom: 1em;
`


const StyledTabs = styled(Tabs)`
  background: ${({ theme }) => theme.colorMappings.background};
  display: block;
  width: 100%;
  font-family: lato;
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
  border-left: 2px solid ${({ theme }) => theme.colorMappings.borders};
  border-bottom: 2px solid ${({ theme }) => theme.colorMappings.borders};

  &.selected {
    color:  ${({ theme }) => theme.colorMappings.primary};
  }

  &.disabled {
    color: #e0e0e0;
    cursor: not-allowed;
  }
`;


const StyledTabPanel = styled(TabPanel).attrs({ selectedClassName: 'selected' })`
  display: none;
  width: 100%;
  &.selected {
    display: block;
  }
`;

StyledTab.tabsRole = 'Tab';
StyledTabs.tabsRole = 'Tabs';
StyledTabPanel.tabsRole = 'TabPanel';
StyledTabList.tabsRole = 'TabList';

export { StyledForm, StyledTab, StyledTabList, StyledTabs, StyledTabPanel, HiddenStyledTab, MessagesContainer, MessageReceived, MessageSent };