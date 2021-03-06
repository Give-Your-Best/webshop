import * as React from 'react';
import { StyledLabel, StyledRadio, StyledError, StyledSelect, StyledInput, InfoNote, StyledInputNumber, StyledCheckboxGroup } from './EditForm.styles';
import { clothingSizeOptions, shoeSizeOptions, currentStatus } from '../../../utils/constants';

export const ShopperFields = () => {
  return (
    <div>
      <StyledLabel>Share address with donors</StyledLabel>
      <div>
        <StyledRadio.Group name="deliveryPreference">
        <StyledRadio value={"direct"}>yes</StyledRadio>
        <StyledRadio value={"via-gyb"}>no</StyledRadio>
        </StyledRadio.Group>
      </div>
      <StyledError name="deliveryPreference" component="div" />

      <StyledLabel>Current Status</StyledLabel>
        <StyledSelect name="currentStatus">
        {currentStatus.map((d)=>{
            return (<StyledSelect.Option key={d} value={d}>{d}</StyledSelect.Option>);
            })}
        </StyledSelect>
      <StyledError name="currentStatus" component="div" />

      <StyledLabel>Referred By</StyledLabel>
        <InfoNote>! - If you weren't referred, please type N/A</InfoNote>
        <StyledInput name="referredBy" />
        <StyledError name="referredBy" component="div" />
      
      <StyledLabel>Are you shopping for more than one person? If so how many?</StyledLabel>
      <StyledInputNumber name="shoppingFor" />
      <StyledError name="shoppingFor" component="div" />

      <StyledLabel>Clothing sizes
      <StyledCheckboxGroup name="clothingSize" options={clothingSizeOptions}/></StyledLabel>
      <StyledError name="clothingSize" component="div" />
      <StyledLabel>Shoe sizes
      <StyledCheckboxGroup name="shoeSize" options={shoeSizeOptions}/></StyledLabel>
      <StyledError name="shoeSize" component="div" />
    </div>
  );
};
