export const deleteBatchItem = async (id, token) => {
  try {
    const response = await fetch(`/api/batchItems/${id}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    const body = await response.json();
    if (response.status !== 200) {
      return {
        success: false,
        message: body.message || 'Failed to delete batch item',
      };
    }
    return body;
  } catch (error) {
    console.error(`Error in deleteBatchItem: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to delete batch item',
    };
  }
};
