import * as React from 'react';
import { StyledLabel, StyledRadio, StyledCheckbox, StyledError} from './EditForm.styles';
import { clothingSizeOptions, shoeSizeOptions } from '../../../utils/constants';

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
      <StyledLabel>Clothing sizes
      <StyledCheckbox.Group name="clothingSize" options={clothingSizeOptions}/></StyledLabel>
      <StyledError name="clothingSize" component="div" />
      <StyledLabel>Shoe sizes
      <StyledCheckbox.Group name="shoeSize" options={shoeSizeOptions}/></StyledLabel>
      <StyledError name="shoeSize" component="div" />
    </div>
  );
};
