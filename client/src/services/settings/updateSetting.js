export const updateSetting = async (name, value, token) => {
  //call api to update setting
  try {
    const response = await fetch(`/api/settings/${name}`, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ value: value }),
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in updateSetting: ${error}`);
    return error;
  }
};
