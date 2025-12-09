import { convertHeic } from '../../utils/helpers';

export const updateBatchItem = async (id, updateData, token) => {
  // handle image conversion
  if (updateData.photos) {
    try {
      updateData.photos = await convertHeic(updateData.photos);
    } catch (convErr) {
      console.error(`Image conversion failed in updateBatchItem: ${convErr}`);
      return {
        success: false,
        message: convErr.message || 'Failed to convert images',
      };
    }
  }

  //call api to update batch item details
  try {
    const response = await fetch(`/api/batchItems/${id}`, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      return {
        success: false,
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in updateBatchItem: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to update batch item',
    };
  }
};
