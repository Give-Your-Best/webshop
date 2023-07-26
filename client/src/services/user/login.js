export const login = async ({ email, password }) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim(),
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
