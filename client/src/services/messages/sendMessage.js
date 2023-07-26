export const sendMessage = async (values, token) => {
  //call api to send message
  try {
    const response = await fetch('/api/messages/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(values),
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in send message: ${error}`);
    return error;
  }
};
