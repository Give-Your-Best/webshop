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
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorBody = await response.json();
        if (errorBody.message) {
          errorMessage = errorBody.message;
        }
      } catch (parseErr) {
        console.warn(
          `Failed to parse error response as JSON: ${parseErr.message}`
        );
        // If JSON parsing fails (e.g., HTML error page), use the default HTTP error message
      }
      return {
        success: false,
        message: errorMessage,
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
