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
    if (!response.ok) {
      return {
        success: false,
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(`Error in getShopperItems: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to fetch shopper items',
    };
  }
};
