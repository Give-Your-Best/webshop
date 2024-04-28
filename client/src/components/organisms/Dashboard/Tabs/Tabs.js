import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AppContext } from '../../../../context/app-context';
import { SocketContext } from '../../../../context/socket-context';
import { AccountContext } from '../../../../context/account-context';
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
import { getTags } from '../../../../services/tags';
import { getUser, getInboxSummary, listUsers } from '../../../../services/user';

// Note! This tabs "wrapper" is currently in use as the data loader for the new
// "account" context - there are certain data we should only be loading if the
// current user is an admin - we dont want to expose all users data to shoppers
// or donors... this should all be restructured with dedicated contexts etc.

export const Tabs = ({ itemId }) => {
  const { token, user } = useContext(AppContext);
  const {
    setAllTags,
    setAllUsers,
    setCurrentUser,
    inboxSummary,
    setInboxSummary,
  } = useContext(AccountContext);
  const channel = useContext(SocketContext);

  const [tabIndex, setTabIndex] = useState(0);

  const totalUnread = {
    [`${user.type}Messages`]: Object.values(inboxSummary).reduce(
      (a, b) => a + b.unviewed,
      0
    ),
  };

  useEffect(() => {
    getInboxSummary(user.id, token).then(({ messages }) => {
      const data = messages.reduce((acc, cur) => {
        acc[cur.threadId] = cur;
        return acc;
      }, {});

      setInboxSummary(data);
    });
  }, [setInboxSummary, token, user.id]);

  const onMessage = useCallback(
    (data) => {
      const updateSummary = ({ threadId }, state) => {
        const update = state[threadId] || {
          threadId,
          userType: data.type,
          messages: 1,
          unviewed: 0,
        };

        return {
          ...update,
          unviewed: (update.unviewed || 0) + 1,
        };
      };

      if (user.id === data.sender) {
        return;
      }

      setInboxSummary((state) => ({
        ...state,
        [data.threadId]: updateSummary(data, state),
      }));
    },
    [setInboxSummary, user.id]
  );

  // Bind the message event listener...
  useEffect(() => {
    channel.bind('new-message', onMessage);
    return () => channel.unbind('new-message', onMessage);
  }, [channel, onMessage]);

  var tabs = tabList(user);

  useEffect(() => {
    tabs.forEach((t, index) => {
      if (itemId && t.id === itemId) {
        setTabIndex(index);
      }
    });
  }, [itemId, tabs]);

  const buildTransformUsersHash = (data) =>
    data.reduce((acc, cur) => {
      const { firstName, lastName, email, kind, _id } = cur;

      acc[_id] = {
        name: `${firstName} ${lastName}`.trim(),
        email,
        _id,
        type: kind,
      };

      return acc;
    }, {});

  // Set all current users to the context as a hash map on the id
  useEffect(() => {
    // Only load all users data in an admin context
    user.type === 'admin' &&
      listUsers(token)
        .then(buildTransformUsersHash)
        .then(setAllUsers)
        .catch(console.warn);
  }, [setAllUsers, token, user.type]);

  // Set the full current user detail
  useEffect(
    () => getUser(user.id, token).then(setCurrentUser).catch(console.warn),
    [setCurrentUser, token, user.id]
  );

  // Set the current tags - not sure how useful this is tbh...
  useEffect(
    () => getTags(token).then(setAllTags).catch(console.warn),
    [setAllTags, token, user.id]
  );

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
              <StyledTab todoCount={totalUnread[d.id]} key={d.name}>
                {d.name}
              </StyledTab>
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
          );
        })}
      </StyledTabs>
    </DashboardMenuWrapper>
  );
};
