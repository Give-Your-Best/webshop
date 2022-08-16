export const deleteTagFromUser = async (userId, tagId, token) => {
    //call api to remove tag from user details
    try {
      const response = await fetch(`/api/tags/user`, {
        method: 'delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({tagId: tagId, userId: userId}),
      });
      const jsonres = await response.json();
      return jsonres;
    } catch (error) {
      console.error(`Error in delte tag from user: ${error}`);
      return error;
    }
};
  