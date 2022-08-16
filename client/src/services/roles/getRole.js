export const getRole = async (name, token) => {
    const response = await fetch(`/api/roles/${name}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };