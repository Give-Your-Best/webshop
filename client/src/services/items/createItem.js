import { convertHeic } from '../../utils/helpers';

export const createItem = async (values, token, bypassImageUpload = false) => {
  // handle image conversion
  if (!bypassImageUpload && values.photos) {
    try {
      values.photos = await convertHeic(values.photos);
    } catch (convErr) {
      console.error(`Image conversion failed in createItem: ${convErr}`);
      return {
        success: false,
        message: convErr.message || 'Failed to convert images',
      };
    }
  }

  //call api to create item
  try {
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
