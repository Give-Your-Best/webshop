export const getAdminItems = async (isCurrent, limit = 10, page = 1) => {
  const response = await fetch(
    `/api/items/admin?isCurrent=${Boolean(
      isCurrent
    )}&limit=${limit}&page=${page}`,
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
