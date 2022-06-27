export const getAdminItems = async (page, limit, isCurrent) => {
    const response = await fetch(`/api/items/admin?page=${page}&limit=${limit}&${(isCurrent)? '&isCurrent='+ isCurrent: 'false'}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };