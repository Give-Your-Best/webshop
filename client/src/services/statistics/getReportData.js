export const getReportData = async (from, to, token) => {
  const response = await fetch(`/api/statistics/report?from=${from}&to=${to}`, {
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
