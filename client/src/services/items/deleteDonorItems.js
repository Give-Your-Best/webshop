export const deleteDonorItems = async (id, token) => {
  try {
    const response = await fetch(`/api/items/donor/${id}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
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
    console.error(`Error in deleteDonorItems: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to delete donor items',
    };
  }
};
