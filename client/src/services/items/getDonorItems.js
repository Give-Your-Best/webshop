import { parseErrorResponse } from '../../utils/responseHandler';

export const getDonorItems = async (userId, itemStatus) => {
  try {
    const response = await fetch(
      `/api/items/donor?userId=${userId}${
        itemStatus ? '&itemStatus=' + itemStatus : ''
      }`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      return await parseErrorResponse(response);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(`Error in getDonorItems: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to fetch donor items',
    };
  }
};
