export const updateItemTags = async (itemId, tagId, token) => {
  console.log('call serv')
  console.log(itemId)
  console.log(tagId)
    //call api to updat item with tag
    try {
      const response = await fetch(`/api/tags/item`, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({tagId: tagId, itemId: itemId}),
      });
      const jsonres = await response.json();
      return jsonres;
    } catch (error) {
      console.error(`Error in updating item with tag: ${error}`);
      return error;
    }
};
  