import React, { useState } from 'react';
import { clothingSizeOptions, shoeSizeOptions } from '../../../utils/constants';
import { StyledSelect } from '../../atoms';
import {
  StyledError,
  StyledLabel,
  StyledInputNumber,
  SizeQuantityContainer,
  SizeQuantityPair,
} from './EditForm.styles';
import { useFormikContext } from 'formik';

export const ClothingSizeFields = ({ editingKey, recordId }) => {
  const formikProps = useFormikContext();
  const [selectedClothingSizes, setSelectedClothingSizes] = useState([]);

  const handleClothingSizeChange = (sizes) => {
    const addedSize = sizes.find(
      (size) => !selectedClothingSizes.includes(size)
    );
    const removedSize = selectedClothingSizes.find(
      (size) => !sizes.includes(size)
    );

    if (addedSize) {
      formikProps.setFieldValue(`clothingSizeQuantities.${addedSize}`, 0);
    } else if (removedSize) {
      const { [removedSize]: removedValue, ...updatedQuantities } =
        formikProps.values.clothingSizeQuantities;
      formikProps.setFieldValue('clothingSizeQuantities', updatedQuantities);
    }

    setSelectedClothingSizes(sizes);
  };

  const handleQuantityChange = (size, quantity) => {
    const validQuantity = Math.max(quantity, 0);
    const updatedQuantities = {
      ...formikProps.values.clothingSizeQuantities,
      [size]: validQuantity,
    };
    formikProps.setFieldValue('clothingSizeQuantities', updatedQuantities);
  };

  return (
    <div>
      <StyledLabel>Clothing size</StyledLabel>
      <StyledSelect
        name="clothingSize"
        disabled={editingKey !== recordId}
        mode="multiple"
        onChange={handleClothingSizeChange}
      >
        {clothingSizeOptions.map((size) => (
          <StyledSelect.Option key={size} value={size}>
            {size}
          </StyledSelect.Option>
        ))}
      </StyledSelect>
      <StyledError name="clothingSize" component="div" />

      {selectedClothingSizes.length > 0 && (
        <>
          <StyledLabel>Clothing size quantities</StyledLabel>
          <SizeQuantityContainer name="sizeQuantityContainer">
            {selectedClothingSizes.map((size) => (
              <SizeQuantityPair name="sizeQuantityPair" key={size}>
                <StyledLabel>{size}:</StyledLabel>
                <StyledInputNumber
                  name={`clothingSizeQuantities.${size}`}
                  onChange={(quantity) => handleQuantityChange(size, quantity)}
                />
              </SizeQuantityPair>
            ))}
          </SizeQuantityContainer>
        </>
      )}
    </div>
  );
};
