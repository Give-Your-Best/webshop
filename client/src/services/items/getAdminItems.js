export const getAdminItems = async (isCurrent) => {
  const response = await fetch(
    `/api/items/admin?${isCurrent ? '&isCurrent=' + isCurrent : 'false'}`,
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
