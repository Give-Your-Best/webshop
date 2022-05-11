import * as React from 'react';
import { SubmitButton } from 'formik-antd';
import { StyledInput, StyledForm, StyledLabel, StyledError } from './EditForm.styles';
import { Button } from '../../atoms';
import { openHiddenTab } from '../../../utils/helpers';
import { AddressFields } from './AddressFields';
import { ShopperFields } from './ShopperFields';

export const UserEditForm = (data) => {
  return (
    <StyledForm>
        <StyledLabel>First name
        <StyledInput name="firstName" /></StyledLabel>
        <StyledError name="firstName" component="div" />

        <StyledLabel>Last name
        <StyledInput name="lastName" /></StyledLabel>
        <StyledError name="lastName" component="div" />

        <StyledLabel>Email address
        <StyledInput name="email" /></StyledLabel>
        <StyledError name="email" component="div" />

        {data.type === 'shopper' && <><AddressFields /><ShopperFields /></> }

        <Button small type="reset" onClick={() => {openHiddenTab('password')}}>Update Password</Button>
        <SubmitButton>Save</SubmitButton>
    </StyledForm>
  );
};

