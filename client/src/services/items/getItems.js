import { parseErrorResponse } from '../../utils/responseHandler';

export const getItems = async (
  page,
  limit,
  approvedStatus,
  itemStatus,
  category,
  subCategory,
  donorId,
  clothingSizes,
  shoeSizes,
  colours,
  gender,
  includeLegacy
) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    approvedStatus,
    itemStatus,
  });

  if (category) params.set('category', category);
  if (subCategory) params.set('subCategory', subCategory);
  if (donorId) params.set('donorId', donorId);
  if (clothingSizes && clothingSizes.length) {
    params.set('clothingSizes', clothingSizes.join(','));
  }
  if (shoeSizes && shoeSizes.length) {
    params.set('shoeSizes', shoeSizes.join(','));
  }
  if (colours && colours.length) {
    params.set('colours', colours.join(','));
  }
  if (gender) params.set('gender', gender);
  if (includeLegacy) params.set('includeLegacy', 'true');

  const fetchString = `/api/items?${params.toString()}`;

  try {
    const response = await fetch(fetchString, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return await parseErrorResponse(response);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(`Error in getItems: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to fetch items',
    };
  }
};
