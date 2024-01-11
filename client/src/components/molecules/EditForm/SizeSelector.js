import React, { useEffect } from 'react';
import {
  StyledInputNumber,
  SizeQuantityContainer,
  SizeQuantityPair,
  StyledLabel,
} from './EditForm.styles';
import { clothingSizeOptions, shoeSizeOptions } from '../../../utils/constants';
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
    const validQuantity = Math.max(quantity, 0);
    const updatedQuantities = {
      ...formikProps.values[`${fieldName}`],
      [size]: validQuantity,
    };

    // perform a sort on the selected sizes as this will be important when they are displayed.
    let sizeOrder = [];
    if (fieldName === 'shoeSizes') {
      sizeOrder = shoeSizeOptions;
    } else {
      sizeOrder = clothingSizeOptions;
    }
    const keyValueArray = Object.entries(updatedQuantities);
    keyValueArray.sort(
      (a, b) => sizeOrder.indexOf(a[0]) - sizeOrder.indexOf(b[0])
    );
    const sortedUpdatedQuantities = Object.fromEntries(keyValueArray);
    setFieldValue(`${fieldName}`, sortedUpdatedQuantities);
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
