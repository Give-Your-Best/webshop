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
    setFieldValue(`shoeSizeBatchValues`, {});
    setFieldValue('clothingSizeBatchValues', {});
  }, [category, subcategory, setFieldValue]);

  const handleQuantityChange = (size, quantity) => {
    const validQuantity = Math.max(quantity, 0);
    const updatedQuantities = {
      ...formikProps.values[`${fieldName}BatchValues`],
      [size]: validQuantity,
    };
    setFieldValue(`${fieldName}BatchValues`, updatedQuantities);
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
              value={formikProps.values[`${fieldName}BatchValues`]?.[size] || 0}
              className={fieldName}
              name={`${fieldName}BatchValues`}
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
