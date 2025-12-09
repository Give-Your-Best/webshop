export const getShopperItems = async (userId, itemStatus) => {
  try {
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
      return {
        success: false,
        message: body.message || 'Failed to fetch shopper items',
      };
    }
    return body;
  } catch (error) {
    console.error(`Error in getShopperItems: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to fetch shopper items',
    };
  }
};
