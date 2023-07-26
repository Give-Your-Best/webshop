export const createTag = async (name, token) => {
  //call api to create tag
  try {
    const response = await fetch('/api/tags/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(name),
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in create tag: ${error}`);
    return error;
  }
};
