export const generateHistoricReport = async (token) => {
  const response = await fetch(`/api/statistics/generate-historic-report`, {
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
