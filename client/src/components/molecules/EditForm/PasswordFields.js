import * as React from 'react';
import { StyledInput, StyledLabel, StyledError } from './EditForm.styles';

export const PasswordFields = () => {
  return (
    <div>
        <StyledLabel>Password
        <StyledInput.Password name="password" /></StyledLabel>
        <StyledError name="password" component="div" />

        <StyledLabel>Confirm Password
        <StyledInput.Password name="passwordConfirm" placeholder="Retype password" /></StyledLabel>
        <StyledError name="passwordConfirm" component="div" />
    </div>
  );
};
