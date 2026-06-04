export const getSetting = async (name) => {
  const response = await fetch(`/api/settings/${name}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await response.json();

  if (!response.ok) {
    throw Error(body?.message || `Failed to fetch setting: ${name}`);
  }

  if (body && typeof body === 'object' && body.success === false) {
    throw Error(body.message || `Failed to fetch setting: ${name}`);
  }

  return body;
};
