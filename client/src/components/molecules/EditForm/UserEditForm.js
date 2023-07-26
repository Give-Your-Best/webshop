import * as React from 'react';
import {
  StyledInput,
  StyledForm,
  StyledLabel,
  StyledError,
  StyledSubmitButton,
  FieldContainerHalf,
} from './EditForm.styles';
import { Button } from '../../atoms';
import { openHiddenTab } from '../../../utils/helpers';
import { AddressFields } from './AddressFields';
import { ShopperFields } from './ShopperFields';
import { PasswordFields } from './PasswordFields';

export const UserEditForm = ({ type, signUp, admin }) => {
  return (
    <StyledForm>
      <FieldContainerHalf>
        <StyledLabel>
          First name
          <StyledInput name="firstName" />
          <StyledError name="firstName" component="div" />
        </StyledLabel>

        <StyledLabel>
          Last name
          <StyledInput name="lastName" />
          <StyledError name="lastName" component="div" />
        </StyledLabel>
      </FieldContainerHalf>
      <StyledLabel>
        Email address
        <StyledInput name="email" />
        <StyledError name="email" component="div" />
      </StyledLabel>
      {signUp && !admin && <PasswordFields />}

      {type === 'shopper' && (
        <>
          <AddressFields />
          <ShopperFields />
        </>
      )}

      {!signUp && <StyledSubmitButton>Save</StyledSubmitButton>}
      {!signUp && (
        <Button
          primary
          type="reset"
          onClick={() => {
            openHiddenTab('password');
          }}
        >
          Update Password
        </Button>
      )}
    </StyledForm>
  );
};
