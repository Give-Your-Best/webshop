export const restoreMessageThread = async (threadId, token) => {
  try {
    const response = await fetch(`/api/messages/unarchive/${threadId}`, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in restore thread ${error}`);
    return error;
  }
};
