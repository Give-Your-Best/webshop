import * as React from 'react';
import { AccountIconCaption, AccountIconImage } from './AccountIconBlock.styles';
import { openHiddenTab } from '../../../utils/helpers';

export const AccountIconBlock = ({ type }) => {

  const openSignUp = () => {
    openHiddenTab(type);
  }
  
  return (
    <div onClick={openSignUp}>
      <AccountIconImage alt={type} src={type + '.svg'} />
      <AccountIconCaption>{type}</AccountIconCaption>
    </div>
  );
};
