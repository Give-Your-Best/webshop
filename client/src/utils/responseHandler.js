/**
 * Parses an error response from a fetch call and returns a standardized error object.
 * Attempts to extract a custom message from the response body if available.
 * Falls back to HTTP status information if JSON parsing fails.
 * @param {Response} response - The fetch response object
 * @returns {Promise<{success: false, message: string}>} - Standardized error object
 */
export const parseErrorResponse = async (response) => {
  let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
  try {
    const errorBody = await response.json();
    if (errorBody.message) {
      errorMessage = errorBody.message;
    }
  } catch (parseErr) {
    console.warn(`Failed to parse error response as JSON: ${parseErr.message}`);
    // If JSON parsing fails (e.g., HTML error page), use the default HTTP error message
  }
  return {
    success: false,
    message: errorMessage,
  };
};
