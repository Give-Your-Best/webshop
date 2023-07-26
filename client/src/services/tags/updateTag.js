export const updateTag = async (id, updateData, token) => {
  //call api to update tag details
  try {
    const response = await fetch(`/api/tags/${id}`, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(updateData),
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in update tag: ${error}`);
    return error;
  }
};
