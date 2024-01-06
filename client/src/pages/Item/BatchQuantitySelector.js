/* eslint-disable */
import React, { useEffect } from 'react';
import {
  StyledInputNumber,
  StyledLabel,
  SizeQuantityContainer,
} from '../../components/molecules/EditForm/EditForm.styles';
import { StyledSelect } from '../../components/atoms';

const BatchQuantitySelector = ({
  sizes,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
}) => {
  useEffect(() => {}, [selectedSize, quantity]);

  const handleQuantityChange = (quantity) => {
    console.log('sizes', sizes);
    const maxQuantity = sizes[selectedSize];
    if (quantity <= maxQuantity) {
      setQuantity(quantity);
    }
  };

  return (
    <div>
      <SizeQuantityContainer className="batchSizeSelector">
        <StyledLabel>
          Size
          <StyledSelect
            name="size"
            className="batchSizeSelector"
            onChange={(value) => {
              setSelectedSize(value);
            }}
          >
            {Object.keys(sizes).map((size) => (
              <StyledSelect.Option key={size} value={size}>
                {size}
              </StyledSelect.Option>
            ))}
          </StyledSelect>
        </StyledLabel>
      </SizeQuantityContainer>
      <StyledLabel>
        Quantity
        <StyledInputNumber
          name="quantity"
          className="batchSizeInput"
          value={quantity}
          min={1}
          max={sizes[selectedSize]}
          disabled={!selectedSize}
          onChange={(newQuantity) => handleQuantityChange(newQuantity)}
        />
      </StyledLabel>
    </div>
  );
};

export default BatchQuantitySelector;
