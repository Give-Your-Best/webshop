import React from 'react';
import CheckboxGroupField from './CheckboxGroupField';
import { sizeOptions } from '../../../utils/sizeOptions';

const RenderItemOptions = ({ category, subcategory, editingKey, recordId }) => {
  const itemOptions = sizeOptions(category, subcategory);

  return (
    <>
      {itemOptions.map((option) => (
        <CheckboxGroupField
          key={`${option.fieldName}-${category}`}
          options={option.sizeOption}
          name={option.fieldName}
          label={option.label}
          editingKey={editingKey}
          recordId={recordId}
        />
      ))}
    </>
  );
};

export default RenderItemOptions;
