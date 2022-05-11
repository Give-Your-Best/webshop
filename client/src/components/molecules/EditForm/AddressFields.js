import * as React from 'react';
import { StyledInput, StyledLabel, StyledError } from './EditForm.styles';

export const AddressFields = () => {
  return (
    <div>
      <StyledLabel>Address Line 1
      <StyledInput name="deliveryAddress.firstLine" /></StyledLabel>
      <StyledError name="deliveryAddress.firstLine" component="div" />
      <StyledLabel>Address Line 2
      <StyledInput name="deliveryAddress.secondLine" /></StyledLabel>
      <StyledError name="deliveryAddress.secondLine" component="div" />
      <StyledLabel>Post Code
      <StyledInput name="deliveryAddress.postcode" /></StyledLabel>
      <StyledError name="deliveryAddress.postcode" component="div" />
    </div>
  );
};
