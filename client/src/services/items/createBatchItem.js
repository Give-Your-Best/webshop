import { convertHeic } from '../../utils/helpers';

export const createBatchItem = async (values, token) => {
  //call api to create batch item
  if (values.photos) {
    values.photos = await convertHeic(values.photos);
  }
  try {
    console.log('values: ', values);
    const response = await fetch('/api/batchItems/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(values),
    });
    console.log('response:', response);
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in createBatchItem: ${error}`);
    return error;
  }
};
