import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../../context/app-context';
import { SocketContext } from '../../../../context/socket-context';
import { Badge } from 'antd';
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
  const socket = useContext(SocketContext);

  const [tabIndex, setTabIndex] = useState(0);
  const [newMessages, setNewMessages] = useState({});

  const totalUnread = {
    [`${user.type}Messages`]: Object.values(newMessages).reduce(
      (a, b) => a + b,
      0
    ),
  };

  console.log({ user, totalUnread });

  var tabs = tabList(user);

  React.useEffect(() => {
    const onMessage = (message) => {
      const { event, data } = JSON.parse(message);

      if (event !== 'NEW_MESSAGE') {
        return;
      }

      if (user.id === data.sender) {
        return;
      }

      setNewMessages((state) => ({
        ...state,
        [data.threadId]: (state[data.threadId] || 0) + 1,
      }));
    };

    socket.on(onMessage);

    return () => socket.off(onMessage);
  }, [newMessages, socket, user.id]);

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
              <Badge count={totalUnread[d.id]}>
                <StyledTab key={d.name}>{d.name}</StyledTab>
              </Badge>
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
