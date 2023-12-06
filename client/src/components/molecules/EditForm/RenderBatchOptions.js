import React from 'react';
import SizeSelector from './SizeSelector';
import { sizeOptions } from '../../../utils/sizeOptions';

const RenderBatchOptions = ({ category, subcategory }) => {
  const options = sizeOptions(category, subcategory);

  return (
    <>
      {options.map((option) => (
        <SizeSelector
          key={`${option.fieldName}-${category}`}
          sizeOptions={option.sizeOption}
          fieldName={option.fieldName}
          label={option.label}
        />
      ))}
    </>
  );
};

export default RenderBatchOptions;
