import React, { useEffect, useState } from 'react';
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
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const updatedOptions = Object.keys(sizes).map((size) => ({
      label: size,
      value: size,
      disabled: sizes[size] === 0,
    }));

    setOptions(updatedOptions);
  }, [selectedSize, quantity, sizes]);

  const handleQuantityChange = (quantity) => {
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
            value={selectedSize}
            onChange={(value) => {
              setSelectedSize(value);
            }}
          >
            {options.map((option) => (
              <StyledSelect.Option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
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
          value={selectedSize ? quantity : 0}
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
