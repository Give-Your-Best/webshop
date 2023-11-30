export const countUsers = async (token) => {
  const response = await fetch(`/api/users/count`, {
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
