import * as React from 'react';
import { StyledLabel, StyledError, StyledInputPassword } from './EditForm.styles';

export const PasswordFields = () => {
  return (
    <div>
        <StyledLabel>Password
        <StyledInputPassword name="password" /></StyledLabel>
        <StyledError name="password" component="div" />

        <StyledLabel>Confirm Password
        <StyledInputPassword name="passwordConfirm" placeholder="Retype password" /></StyledLabel>
        <StyledError name="passwordConfirm" component="div" />
    </div>
  );
};
