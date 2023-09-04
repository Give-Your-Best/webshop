export const getInboxSummary = async (id, token) => {
  const response = await fetch(`/api/users/${id}/inbox`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  const body = await response.json();
  // console.log('asdasd', { body });
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};
