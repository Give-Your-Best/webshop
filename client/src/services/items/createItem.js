import { convertHeic } from '../../utils/helpers';

export const createItem = async (values, token) => {
  //call api to create item
  if (values.photos) {
    values.photos = await convertHeic(values.photos);
  }
  try {
    const response = await fetch('/api/items/', {
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
    return error;
  }
};
