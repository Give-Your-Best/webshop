import { convertHeic } from '../../utils/helpers';

export const updateBatchItem = async (id, updateData, token) => {
  if (updateData.photos) {
    updateData.photos = await convertHeic(updateData.photos);
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
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in updateBatchItem: ${error}`);
    return error;
  }
};
