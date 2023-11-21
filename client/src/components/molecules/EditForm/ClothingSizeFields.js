import React from 'react';
import { clothingSizeOptions } from '../../../utils/constants';
import SizeSelector from './SizeSelector';

export const ClothingSizeFields = () => (
  <SizeSelector
    sizeOptions={clothingSizeOptions}
    fieldName="clothingSize"
    label="Clothing Size"
  />
);
