import { convertHeic } from '../../utils/helpers'

export const updateItem = async (id, updateData, token) => {
  console.log('am i u[dating?')
  if (updateData.photos) {
    updateData.photos = await convertHeic(updateData.photos);
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
      const jsonres = await response.json();
      return jsonres;
    } catch (error) {
      console.error(`Error in updateItem: ${error}`);
      return error;
    }
};
  