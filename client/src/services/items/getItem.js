export const getItem = async (id) => {
  const response = await fetch(`/api/items/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};
