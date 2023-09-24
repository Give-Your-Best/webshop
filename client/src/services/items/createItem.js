export const createItem = async (values, token) => {
  //call api to create item
  try {
    const body = {
      ...values,
      photos: values.photos.map((p) => p.response || p),
    };
    const response = await fetch('/api/items/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(body),
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in createItem: ${error}`);
    return error;
  }
};
