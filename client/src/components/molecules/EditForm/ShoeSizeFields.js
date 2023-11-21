import React from 'react';
import { shoeSizeOptions } from '../../../utils/constants';
import SizeSelector from './SizeSelector';

export const ShoeSizeFields = () => (
  <SizeSelector
    sizeOptions={shoeSizeOptions}
    fieldName="shoeSize"
    label="Shoe Size"
  />
);
