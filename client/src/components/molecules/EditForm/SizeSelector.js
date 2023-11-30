import React from 'react';
import {
  StyledInputNumber,
  SizeQuantityContainer,
  SizeQuantityPair,
  StyledLabel,
} from './EditForm.styles';
import { useFormikContext } from 'formik';

const SizeSelector = ({ sizeOptions, fieldName, label }) => {
  const formikProps = useFormikContext();

  const handleQuantityChange = (size, quantity) => {
    const validQuantity = Math.max(quantity, 0);
    const updatedQuantities = {
      ...formikProps.values[fieldName],
      [size]: validQuantity,
    };
    formikProps.setFieldValue(fieldName, updatedQuantities);
  };

  return (
    <div>
      <StyledLabel>{`${label} Quantities`}</StyledLabel>
      <SizeQuantityContainer name="sizeQuantityContainer">
        {sizeOptions.map((size) => (
          <SizeQuantityPair
            className={fieldName}
            key={`['${fieldName}-${size}']`}
          >
            <StyledLabel className={fieldName}>{size}</StyledLabel>
            <StyledInputNumber
              className={fieldName}
              name={`['${fieldName}-${size}']`}
              min="0"
              onChange={(quantity) => handleQuantityChange(size, quantity)}
            />
          </SizeQuantityPair>
        ))}
      </SizeQuantityContainer>
    </div>
  );
};

export default SizeSelector;
