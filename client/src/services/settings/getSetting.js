export const getSetting = async (name) => {
  const response = await fetch(`/api/settings/${name}`, {
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
