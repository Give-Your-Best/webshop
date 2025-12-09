export const getAccountNotificationsItems = async (adminUserId, token) => {
  const response = await fetch(
    `/api/items/accountNotification?adminUserId=${adminUserId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
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
};
