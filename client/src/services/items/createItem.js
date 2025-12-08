import { convertHeic } from '../../utils/helpers';

export const createItem = async (values, token, bypassImageUpload = false) => {
  //call api to create item
  try {
    if (!bypassImageUpload && values.photos) {
      values.photos = await convertHeic(values.photos);
    }
    // Construct the URL with the query parameter
    const url = bypassImageUpload
      ? '/api/items/?bypassImageUpload=true'
      : '/api/items/';
    const response = await fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(values),
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in createItem: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to create item',
    };
  }
};
