export const getShopperItems = async (userId, itemStatus) => {
  const response = await fetch(
    `/api/items/shopper?userId=${userId}&itemStatus=${itemStatus}`,
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
