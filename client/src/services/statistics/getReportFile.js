export const getReportFile = async (token) => {
  try {
    const response = await fetch(
      `/api/statistics/download-latest-report/historic`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Get the report name from the 'Report-Name' header
    const reportName = response.headers.get('Report-Name');

    // Get the blob from the response
    const blob = await response.blob();

    // Create a new object URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link and simulate a click to download the file
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName}.xlsx`;
    a.click();

    // Release the reference to the object URL after the download is complete
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error(`Error in downloading report: ${error}`);
  }
};
