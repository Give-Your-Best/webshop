import * as React from 'react';
import {
  StyledLabel,
  StyledRadio,
  StyledError,
  StyledSelect,
  StyledInput,
  InfoNote,
  StyledInputNumber,
  StyledCheckboxGroup,
} from './EditForm.styles';
import {
  clothingSizeOptions,
  shoeSizeOptions,
  currentStatus,
} from '../../../utils/constants';

export const ShopperFields = ({ admin, signUp }) => {
  return (
    <div>
      <StyledLabel>Share address with donors</StyledLabel>
      <InfoNote>{`If you are staying in a hotel please select 'no'`}</InfoNote>
      <div>
        <StyledRadio.Group name="deliveryPreference">
          <StyledRadio value={'direct'}>yes</StyledRadio>
          <StyledRadio value={'via-gyb'}>no</StyledRadio>
        </StyledRadio.Group>
      </div>
      <StyledError name="deliveryPreference" component="div" />

      <StyledLabel>Current Status</StyledLabel>
      <StyledSelect name="currentStatus">
        {currentStatus.map((d) => {
          return (
            <StyledSelect.Option key={d} value={d}>
              {d}
            </StyledSelect.Option>
          );
        })}
      </StyledSelect>
      <StyledError name="currentStatus" component="div" />

      <StyledLabel>Case workers: state your organisation</StyledLabel>
      <StyledInput name="organisation" />
      <StyledError name="organisation" component="div" />

      <StyledLabel>Referred By</StyledLabel>
      <InfoNote>{`! - If you weren't referred, please type N/A`}</InfoNote>
      <StyledInput name="referredBy" />
      <StyledError name="referredBy" component="div" />

      <StyledLabel>How many adults are you shopping for?</StyledLabel>
      <StyledInputNumber
        disabled={!signUp && !admin}
        name="shoppingFor"
        max={5}
        min={1}
      />
      <StyledError name="shoppingFor" component="div" />

      <StyledLabel>How many children are you shopping for?</StyledLabel>
      <StyledInputNumber
        disabled={!signUp && !admin}
        name="shoppingForChildren"
        max={5}
        min={0}
      />
      <StyledError name="shoppingForChildren" component="div" />

      {!signUp && !admin && (
        <InfoNote>{`If you need to amend the number of people you're shopping for please contact us on hello@giveyourbest.uk`}</InfoNote>
      )}

      <StyledLabel>
        Clothing sizes
        <StyledCheckboxGroup
          name="clothingSize"
          options={clothingSizeOptions}
        />
      </StyledLabel>
      <StyledError name="clothingSize" component="div" />
      <StyledLabel>
        Shoe sizes
        <StyledCheckboxGroup name="shoeSize" options={shoeSizeOptions} />
      </StyledLabel>
      <StyledError name="shoeSize" component="div" />
    </div>
  );
};
