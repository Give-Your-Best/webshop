export const getMessages = async (type, id, archived = false, token) => {
  const response = await fetch(
    `/api/messages?type=${type}&id=${id}&archived=${archived}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    }
  );
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};
