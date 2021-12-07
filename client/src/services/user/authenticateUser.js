export const authenticateUser = async (token) => {
  try {
    const response = await fetch('/api/auth/authenticate', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in authenticateUser: ${error}`);
    return error;
  }
};
