export const getAdminItems = async ({
  isCurrent,
  limit = 10,
  page = 1,
  donorId = undefined,
  shopperId = undefined,
}) => {
  const params = new URLSearchParams({ isCurrent, limit, page });

  if (donorId) {
    params.set('donorId', donorId);
  } else if (shopperId) {
    params.set('shopperId', shopperId);
  }

  const response = await fetch(`/api/items/admin?${params.toString()}`, {
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
