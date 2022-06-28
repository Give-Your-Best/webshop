export const getDonations = async (approvedStatus, token) => {
  console.log(approvedStatus)
  const response = await fetch(`/api/users/donations?approvedStatus=${approvedStatus}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};