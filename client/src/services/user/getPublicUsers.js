export const getPublicUsers = async (token) => {
  const response = await fetch(`/api/users/public`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  const body = await response.json();
  console.log({ body });
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};
