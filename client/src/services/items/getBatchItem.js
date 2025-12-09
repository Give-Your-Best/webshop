export const getBatchItem = async (id) => {
  try {
    const response = await fetch(`/api/batchItems/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return {
        success: false,
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(`Error in getBatchItem: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to fetch batch item',
    };
  }
};
