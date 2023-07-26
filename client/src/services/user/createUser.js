export const createUser = async (values, token) => {
  //call api to create user
  try {
    const response = await fetch('/api/users/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(values),
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in createUser: ${error}`);
    return error;
  }
};
