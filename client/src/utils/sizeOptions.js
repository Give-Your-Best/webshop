import {
  childrensShoeSizeOptions,
  childrenClothingSizeOptions,
  shoeSizeOptions,
  clothingSizeOptions,
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
            sizeOption: childrenClothingSizeOptions,
            fieldName: 'childrenClothingSize',
            label: 'Children Clothing Size',
          },
          {
            sizeOption: childrensShoeSizeOptions,
            fieldName: 'childrenShoeSize',
            label: 'Children Shoe Size',
          },
        ];
      } else if (subcategory === 'children-shoes') {
        sizeOptions = [
          {
            sizeOption: childrensShoeSizeOptions,
            fieldName: 'childrenShoeSize',
            label: 'Children Shoe Size',
          },
        ];
      } else {
        sizeOptions = [
          {
            sizeOption: childrenClothingSizeOptions,
            fieldName: 'childrenClothingSize',
            label: 'Children Clothing Size',
          },
        ];
      }
      break;
    case 'accessories':
      if (subcategory === 'winter') {
        sizeOptions = [
          {
            sizeOption: clothingSizeOptions,
            fieldName: 'clothingSize',
            label: 'Clothing Size',
          },
        ];
      } else {
        sizeOptions = [];
      }
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
    default:
      sizeOptions = [];
  }

  return sizeOptions;
};
