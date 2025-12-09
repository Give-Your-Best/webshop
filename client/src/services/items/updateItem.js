import { convertHeic } from '../../utils/helpers';

export const updateItem = async (id, updateData, token) => {
  //call api to update item details
  try {
    if (updateData.photos) {
      updateData.photos = await convertHeic(updateData.photos);
    }
    const response = await fetch(`/api/items/${id}`, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(updateData),
    });
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
