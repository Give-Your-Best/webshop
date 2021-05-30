export const getItems = async () => {
  const response = await fetch('/api/items');
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};
