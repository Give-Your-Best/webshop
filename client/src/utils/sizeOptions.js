import {
  // childrensShoeSizeOptions,
  // childrenClothingSizeOptions,
  shoeSizeOptions,
  clothingSizeOptions,
  oneSizeOptions,
} from './constants';

export const sizeOptions = (category, subcategory) => {
  let sizeOptions = [];

  switch (category) {
    case 'women':
      sizeOptions = [
        {
          sizeOption: clothingSizeOptions,
          fieldName: 'clothingSize',
          label: 'Clothing Size',
        },
      ];
      break;
    case 'children':
      if (subcategory === 'baby') {
        sizeOptions = [
          {
            sizeOption: clothingSizeOptions,
            fieldName: 'clothingSize',
            label: 'Clothing Size',
          },
          {
            sizeOption: shoeSizeOptions,
            fieldName: 'shoeSize',
            label: 'Shoe Size',
          },
        ];
      } else {
        sizeOptions = [
          {
            sizeOption: clothingSizeOptions,
            fieldName: 'clothingSize',
            label: 'Clothing Size',
          },
        ];
      }
      break;
    case 'accessories':
      sizeOptions = [
        {
          sizeOption: oneSizeOptions,
          fieldName: 'clothingSize',
          label: 'Accessories',
        },
      ];
      break;
    case 'shoes':
      sizeOptions = [
        {
          sizeOption: shoeSizeOptions,
          fieldName: 'shoeSize',
          label: 'Shoe Size',
        },
      ];
      break;
    case 'other':
      sizeOptions = [
        {
          sizeOption: oneSizeOptions,
          fieldName: 'clothingSize',
          label: 'Other',
        },
      ];
      break;
    default:
      sizeOptions = [];
      break;
  }

  return sizeOptions;
};
