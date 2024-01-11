export const createItemWithoutImageUpload = async (values, token) => {
  //call api to create item without images
  try {
    const response = await fetch('/api/items/without-image-upload', {
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
    console.error(`Error in createItemWithoutImageUpload: ${error}`);
    return error;
  }
};
