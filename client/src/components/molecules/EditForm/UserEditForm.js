import * as React from 'react';
import { StyledInput, StyledForm, StyledLabel, StyledError, StyledSubmitButton } from './EditForm.styles';
import { Button } from '../../atoms';
import { openHiddenTab } from '../../../utils/helpers';
import { AddressFields } from './AddressFields';
import { ShopperFields } from './ShopperFields';
import { PasswordFields } from './PasswordFields';

export const UserEditForm = ({type, signUp, admin}) => {

  return (
    <StyledForm>
      <div>
      <StyledLabel>First name
        <StyledInput name="firstName" /></StyledLabel>
        <StyledError name="firstName" component="div" />

        <StyledLabel>Last name
        <StyledInput name="lastName" /></StyledLabel>
        <StyledError name="lastName" component="div" />   
      </div>
      <div>
        <StyledLabel>Email address
          <StyledInput name="email" /></StyledLabel>
        <StyledError name="email" component="div" />
      </div>
        {signUp && !admin && <PasswordFields />}

        {type === 'shopper' && <><AddressFields /><ShopperFields /></> }

        {!signUp && <Button primary left small type="reset" onClick={() => {openHiddenTab('password')}}>Update Password</Button>}
        {!signUp && <StyledSubmitButton>Save</StyledSubmitButton>}
    </StyledForm>
  );
};

