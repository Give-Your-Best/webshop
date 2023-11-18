import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AppContext } from '../../../../context/app-context';
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
import { countUsers } from '../../../../services/user';
import { listUsers } from '../../../../services/user';

export const Tabs = ({ itemId }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { token, user } = useContext(AppContext);
  const { setAllTags, setAllUsers } = useContext(AccountContext);

  var tabs = tabList(user);

  useEffect(() => {
    tabs.forEach((t, index) => {
      if (itemId && t.id === itemId) {
        setTabIndex(index);
      }
    });
  }, [itemId, tabs]);

  // Runs five queries in parallel for speed - pull minimal lean result for all
  // existing users from the db (maybe we want to exclude non-approved?)
  const fetchAllUsers = useCallback(async () => {
    const { total } = await countUsers(token);

    const rem = total % 4;
    const lim = (total - rem) / 4;

    const data = await Promise.all(
      [lim, lim, lim, lim, rem].map(async (limit, index) =>
        listUsers(token, limit, index * limit)
      )
    );

    setAllUsers(
      [].concat(...data).map(({ firstName, lastName, email, kind, _id }) => ({
        name: `${firstName} ${lastName}`.trim(),
        email,
        id: _id,
        type: kind,
      }))
    );
  }, [setAllUsers, token]);

  useEffect(fetchAllUsers, [fetchAllUsers, token, user]);

  // Set the current tags - not sure how usefult this is tbh...
  useEffect(() => getTags(token).then(setAllTags), [setAllTags, token, user]);

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
          );
        })}
      </StyledTabs>
    </DashboardMenuWrapper>
  );
};
