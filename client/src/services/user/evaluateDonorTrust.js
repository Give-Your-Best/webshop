export const evaluateDonorTrust = async (itemId, token) => {
  //call api to evaluate donor & update if needed
  try {
    const response = await fetch(`/api/users/donor/trust/${itemId}`, {
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
    console.error(`Error in evaluateDonorTrust: ${error}`);
    return error;
  }
};
