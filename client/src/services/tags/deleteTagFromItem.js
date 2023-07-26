export const deleteTagFromItem = async (itemId, tagId, token) => {
  //call api to remove tag from item details
  try {
    const response = await fetch(`/api/tags/item`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ tagId: tagId, itemId: itemId }),
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in delte tag from item: ${error}`);
    return error;
  }
};
