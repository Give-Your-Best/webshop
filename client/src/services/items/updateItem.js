export const updateItem = async (id, updateData, token) => {
  //call api to update item details
  try {
    const body = {
      ...updateData,
      photos: updateData.photos.map((p) => p.response || p),
    };
    const response = await fetch(`/api/items/${id}`, {
      method: 'put',
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
    console.error(`Error in updateItem: ${error}`);
    return error;
  }
};
