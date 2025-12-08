import { convertHeic } from '../../utils/helpers';

export const createBatchItem = async (values, token) => {
  //call api to create batch item
  try {
    if (values.photos) {
      values.photos = await convertHeic(values.photos);
    }
    const response = await fetch('/api/batchItems/', {
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
    console.error(`Error in createBatchItem: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to create batch item',
    };
  }
};
