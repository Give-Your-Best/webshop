import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import {
  AccountWelcomeWrapper,
  AccountWelcomeIcon,
} from './AccountWelcome.styles';

export const AccountWelcome = ({ firstName, lastName }) => {
  const { user } = useContext(AppContext);
  var welcome = '';
  var initials = '';
  if (!firstName && user.firstName && user.lastName) {
    welcome = 'Welcome back, ' + user.firstName + ' ' + user.lastName + '!';
    initials = user.firstName[0] + user.lastName[0];
  } else if (firstName && lastName) {
    welcome = firstName + ' ' + lastName;
    initials = firstName[0] + lastName[0];
  } else {
    welcome = 'Welcome back!';
  }

  return (
    <AccountWelcomeWrapper>
      <AccountWelcomeIcon>
        <p>{initials}</p>
      </AccountWelcomeIcon>
      <h3>{welcome}</h3>
    </AccountWelcomeWrapper>
  );
};
