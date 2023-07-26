export const updateLocation = async (id, updateData, token) => {
  //call api to update location details
  try {
    const response = await fetch(`/api/locations/${id}`, {
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
    console.error(`Error in updateLocation: ${error}`);
    return error;
  }
};
