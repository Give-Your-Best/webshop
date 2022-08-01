export const updateItemTags = async (tags, itemId, token) => {
    //call api to update location details
    try {
      const response = await fetch(`/api/tags/${itemId}`, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(tags),
      });
      const jsonres = await response.json();
      return jsonres;
    } catch (error) {
      console.error(`Error in updateLocation: ${error}`);
      return error;
    }
};
  