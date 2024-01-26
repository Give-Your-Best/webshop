import React, { useEffect } from 'react';
import {
  StyledInputNumber,
  SizeQuantityContainer,
  SizeQuantityPair,
  StyledLabel,
} from './EditForm.styles';
import { useFormikContext } from 'formik';

const SizeSelector = ({
  sizeOptions,
  fieldName,
  label,
  editingKey,
  recordId,
  category,
  subcategory,
}) => {
  const { setFieldValue, ...formikProps } = useFormikContext();

  useEffect(() => {
    // clear quantity values when category is changed
    setFieldValue(`shoeSizes`, {});
    setFieldValue('clothingSizes', {});
  }, [category, subcategory, setFieldValue]);

  const handleQuantityChange = (size, quantity) => {
    let updatedQuantities = {
      ...formikProps.values[`${fieldName}`],
    };

    if (quantity === 0) {
      // If quantity is 0, check if the size exists and remove it
      // [case: when a user inputs a number but decides that's the wrong size and puts it back to zero, we don't want to record those in the db.]
      if (Object.prototype.hasOwnProperty.call(updatedQuantities, size)) {
        delete updatedQuantities[size];
      }
    } else {
      const validQuantity = Math.max(quantity, 1);
      updatedQuantities = {
        ...updatedQuantities,
        [size]: validQuantity,
      };
    }
    if (Object.keys(updatedQuantities).length > 0) {
      setFieldValue(`${fieldName}`, updatedQuantities);
    }
  };

  return (
    <div>
      <StyledLabel>{`${label} Quantities`}</StyledLabel>
      <SizeQuantityContainer className={fieldName}>
        {sizeOptions.map((size) => (
          <SizeQuantityPair
            className={fieldName}
            key={`['${fieldName}-${size}']`}
          >
            <StyledLabel className={fieldName}>{size}</StyledLabel>
            <StyledInputNumber
              value={formikProps.values[`${fieldName}`]?.[size] || 0}
              className={fieldName}
              name={`${fieldName}`}
              min="0"
              onChange={(quantity) => handleQuantityChange(size, quantity)}
              disabled={editingKey !== recordId}
            />
          </SizeQuantityPair>
        ))}
      </SizeQuantityContainer>
    </div>
  );
};

export default SizeSelector;
