export const listUsers = async (token, limit, offset) => {
  const params = new URLSearchParams();

  if (limit) {
    params.set('limit', limit);
  }

  if (offset) {
    params.set('offset', offset);
  }

  const search = params.size ? `?${params.toString()}` : '';

  const response = await fetch(`/api/users/list${search}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }

  return body;
};
