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
  const formikProps = useFormikContext();

  useEffect(() => {
    formikProps.setFieldValue('shoeSize', {});
    formikProps.setFieldValue('clothingSize', {});
    formikProps.setFieldValue('childrenShoeSize', {});
    formikProps.setFieldValue('childrenClothingSize', {});
    console.log('formikProps.values useEffect: ', formikProps.values);
    console.log(
      'formikProps.values[fieldName]?.[size]: ',
      formikProps.values[fieldName]?.['UK0']
    );
  }, [category, subcategory]);

  const handleQuantityChange = (size, quantity) => {
    const validQuantity = Math.max(quantity, 0);
    const updatedQuantities = {
      ...formikProps.values[fieldName],
      [size]: validQuantity,
    };
    formikProps.setFieldValue(fieldName, updatedQuantities);
    console.log('formikProps.values handQuantityChange: ', formikProps.values);
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
              value={formikProps.values[fieldName]?.[size] || 0}
              className={fieldName}
              name={`['${fieldName}]`}
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
