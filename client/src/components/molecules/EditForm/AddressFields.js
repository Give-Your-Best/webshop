import * as React from 'react';
import {
  StyledInput,
  StyledLabel,
  StyledError,
  FieldContainerHalf,
  InfoNote,
} from './EditForm.styles';

export const AddressFields = () => {
  return (
    <>
      <FieldContainerHalf>
        <StyledLabel>
          Address Line 1
          <StyledInput name="deliveryAddress.firstLine" />
          <StyledError name="deliveryAddress.firstLine" component="div" />
        </StyledLabel>
        <StyledLabel>
          Address Line 2
          <InfoNote>
            If you are staying in a hotel please write your room number
          </InfoNote>
          <StyledInput name="deliveryAddress.secondLine" />
          <StyledError name="deliveryAddress.secondLine" component="div" />
        </StyledLabel>
      </FieldContainerHalf>
      <FieldContainerHalf>
        <StyledLabel>
          City
          <StyledInput name="deliveryAddress.city" />
          <StyledError name="deliveryAddress.city" component="div" />
        </StyledLabel>
        <StyledLabel>
          Post Code
          <StyledInput name="deliveryAddress.postcode" />
          <StyledError name="deliveryAddress.postcode" component="div" />
        </StyledLabel>
      </FieldContainerHalf>
    </>
  );
};
