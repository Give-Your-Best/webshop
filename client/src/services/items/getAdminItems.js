export const getAdminItems = async ({
  isCurrent,
  limit = 10,
  page = 1,
  donorId = undefined,
  shopperId = undefined,
}) => {
  const response = await fetch(
    `/api/items/admin?isCurrent=${Boolean(
      isCurrent
    )}&limit=${limit}&page=${page}${donorId ? `&donorId=${donorId}` : ''}${
      shopperId ? `&shopperId=${shopperId}` : ''
    }`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};
