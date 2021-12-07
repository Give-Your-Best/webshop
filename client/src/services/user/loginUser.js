export const loginUser = async ({ username, password }) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in loginUser: ${error}`);
    return error;
  }
};
