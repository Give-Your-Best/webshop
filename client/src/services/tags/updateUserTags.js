export const updateUserTags = async (userId, tagId, token) => {
  //call api to update user with tag
  try {
    const response = await fetch(`/api/tags/user`, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ tagId: tagId, userId: userId }),
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in update user with tag: ${error}`);
    return error;
  }
};
