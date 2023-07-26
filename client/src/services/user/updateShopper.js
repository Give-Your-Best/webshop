export const updateShopper = async (id, updateData, token) => {
  //call api to update user details
  try {
    const response = await fetch(`/api/users/shopper/${id}`, {
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
    console.error(`Error in updateUser: ${error}`);
    return error;
  }
};
