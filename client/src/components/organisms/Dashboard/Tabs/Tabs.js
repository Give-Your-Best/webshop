import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../../context/app-context';
// import { SocketContext } from '../../../../context/socket-context';
import {
  StyledTab,
  StyledTabList,
  StyledTabs,
  StyledTabPanel,
  DashboardMenuWrapper,
  StyledTabPanelDashboardImage,
  StyledTabHidden,
} from './Tabs.styles';
import { AccountWelcome } from '../../../molecules/AccountWelcome';
import { tabList } from '../../../../utils/helpers';

export const Tabs = ({ itemId }) => {
  const { user } = useContext(AppContext);
  // const socket = useContext(SocketContext); // ('ws://localhost:8000');

  const [tabIndex, setTabIndex] = useState(0);
  // const [newMessages, setNewMessages] = useState({});

  // const [blah, setBlah] = useState(0);

  var tabs = tabList(user);

  // React.useEffect(() => {
  //   const onMessage = (message) => {
  //     const { event, data } = JSON.parse(message);

  //     console.log({ event, data });

  //     console.log({ x: user.id, y: data.user });

  //     setNewMessages((state) => ({
  //       [data.threadId]: data,
  //       ...state,
  //     }));
  //   };

  //   socket.on(onMessage);

  //   return () => socket.off(onMessage);
  // }, [socket]);

  // console.log({ newMessages });

  useEffect(() => {
    tabs.forEach((t, index) => {
      if (itemId && t.id === itemId) {
        setTabIndex(index);
      }
    });
  }, [itemId, tabs]);

  return (
    <DashboardMenuWrapper>
      <StyledTabs
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <StyledTabList>
          <AccountWelcome />
          {tabs.map((d) => {
            return d.name === 'Dashboard' ? (
              <StyledTabHidden key={d.name}>{d.name}</StyledTabHidden>
            ) : (
              <StyledTab key={d.name}>{d.name}</StyledTab>
            );
          })}
        </StyledTabList>

        {tabs.map((d) => {
          return d.name === 'Dashboard' ? (
            <StyledTabPanelDashboardImage key={d.name}>
              {d.content}
            </StyledTabPanelDashboardImage>
          ) : (
            <StyledTabPanel key={d.name}>{d.content}</StyledTabPanel>
            // <StyledTabPanel key={d.name}>
            //   {d.name === 'Messaging' ? d.content({ setBlah }) : d.content}
            // </StyledTabPanel>
          );
        })}
      </StyledTabs>
    </DashboardMenuWrapper>
  );
};
