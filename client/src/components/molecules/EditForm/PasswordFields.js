import * as React from 'react';
import { StyledLabel, StyledError, StyledInputPassword, FieldContainerHalf } from './EditForm.styles';

export const PasswordFields = () => {
  return (
    <FieldContainerHalf>
        <StyledLabel>Password
        <StyledInputPassword name="password" />
        <StyledError name="password" component="div" /></StyledLabel>


        <StyledLabel>Confirm Password
        <StyledInputPassword name="passwordConfirm" placeholder="Retype password" />
        <StyledError name="passwordConfirm" component="div" /></StyledLabel>
    </FieldContainerHalf>
  );
};
