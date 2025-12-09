export const getAdminItems = async ({
  isCurrent = true,
  withCount = true,
  limit = 10,
  page = 1,
  donorId = undefined,
  shopperId = undefined,
  category = undefined,
  status = undefined,
  sortBy = undefined,
  searchTerm = undefined,
}) => {
  const params = new URLSearchParams({ isCurrent, withCount, limit, page });

  if (donorId) {
    params.set('donorId', donorId);
  } else if (shopperId) {
    params.set('shopperId', shopperId);
  }

  if (category) {
    params.set('category', category.join(','));
  }

  if (status) {
    params.set('status', status.join(','));
  }

  if (sortBy) {
    params.set('sort', sortBy);
  }

  if (searchTerm) {
    params.set('search', searchTerm.trim().replace(/\s+/g, ','));
  }

  const response = await fetch(`/api/items/admin?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
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
};
