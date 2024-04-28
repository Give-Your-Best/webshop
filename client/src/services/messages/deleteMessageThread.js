export const deleteMessageThread = async (threadId, token) => {
  try {
    const response = await fetch(`/api/messages/${threadId}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in delete thread ${error}`);
    return error;
  }
};
