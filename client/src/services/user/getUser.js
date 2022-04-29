export const getUser = async (id, token) => {
  console.log(id);
  const response = await fetch(`/api/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  console.log(body)
  return body;
};