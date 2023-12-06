import React from 'react';
import SizeSelector from './SizeSelector';
import { sizeOptions } from '../../../utils/sizeOptions';

const RenderBatchOptions = ({
  category,
  subcategory,
  editingKey,
  recordId,
}) => {
  const options = sizeOptions(category, subcategory);

  return (
    <>
      {options.map((option) => (
        <SizeSelector
          key={`${option.fieldName}-${category}`}
          sizeOptions={option.sizeOption}
          fieldName={option.fieldName}
          label={option.label}
          editingKey={editingKey}
          recordId={recordId}
          category={category}
          subcategory={subcategory}
        />
      ))}
    </>
  );
};

export default RenderBatchOptions;
