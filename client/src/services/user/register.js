export const register = async ({ email, username, password, type }) => {
    //call api to register user
    try {
      const response = await fetch('/api/register', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
          type
        }),
      });
      const jsonres = await response.json();
      return jsonres;
    } catch (error) {
      console.error(`Error in createUser: ${error}`);
      return error;
    }
  };
  