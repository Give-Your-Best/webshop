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
    console.log('formikProps.values: ', formikProps.values);
    console.log('formikProps: ', formikProps);
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
            key={`${fieldName}-${size.toString().replace('.', '_')}`}
          >
            <StyledLabel className={fieldName}>{size}</StyledLabel>
            <StyledInputNumber
              className={fieldName}
              /*
                Some of the size options are fractional e.g. [2.5, 3.5, etc].
                resulting in some of the input boxes having coupled behaviour if their names
                untreated, e.g. 2 & 2.5 were coupled; adding underscore prevents from this behaviour.
              */
              name={`${fieldName}-${size.toString().replace('.', '_')}`}
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
