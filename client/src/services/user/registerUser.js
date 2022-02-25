export const registerUser = async ({ email, username, password }) => {
    //call api to register user
    try {
      const response = await fetch('/api/users', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email
        }),
      });
      const jsonres = await response.json();
      return jsonres;
    } catch (error) {
      console.error(`Error in createUser: ${error}`);
      return error;
    }
  };
  