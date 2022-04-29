export const updatePassword = async (updateData, token) => {
  console.log('update [asswprd service')
  console.log(updateData)
  try {
    const response = await fetch('/api/auth/updatepass', {
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
    console.error(`Error in updatePassword: ${error}`);
    return error;
  }
};
