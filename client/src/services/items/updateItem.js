import { convertHeic } from '../../utils/helpers';
import { parseErrorResponse } from '../../utils/responseHandler';

export const updateItem = async (id, updateData, token) => {
  // handle image conversion
  if (updateData.photos) {
    try {
      updateData.photos = await convertHeic(updateData.photos);
    } catch (convErr) {
      console.error(`Image conversion failed in updateItem: ${convErr}`);
      return {
        success: false,
        message: convErr.message || 'Failed to convert images',
      };
    }
  }

  //call api to update item details
  try {
    const response = await fetch(`/api/items/${id}`, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      return await parseErrorResponse(response);
    }
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in updateItem: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to update item',
    };
  }
};
