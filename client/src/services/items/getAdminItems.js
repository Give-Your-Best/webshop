export const getAdminItems = async ({
  isCurrent = true,
  withCount = true,
  limit = 10,
  page = 1,
  donorId = undefined,
  shopperId = undefined,
  category = undefined,
  status = undefined,
  sortBy = undefined,
}) => {
  const params = new URLSearchParams({ isCurrent, withCount, limit, page });

  if (donorId) {
    params.set('donorId', donorId);
  } else if (shopperId) {
    params.set('shopperId', shopperId);
  }

  if (category) {
    params.set('category', category.join(','));
  }

  if (status) {
    params.set('status', status.join(','));
  }

  if (sortBy) {
    params.set('sort', sortBy);
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
