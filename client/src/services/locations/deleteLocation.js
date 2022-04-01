export const deleteLocation = async (id, token) => {
  const response = await fetch(`/api/locations/${id}`, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
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