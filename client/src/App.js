import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppHeading, Button, Box } from './components';
import { theme } from './theme';

const App = () => {
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    console.log('++ env ++', process.env.NODE_ENV);
    const reachApi = async () => {
      const res = await callBackendAPI();
      setMessage(res?.message || 'API request failed!');
    };
    reachApi();
  }, []);

  const callBackendAPI = async () => {
    const response = await fetch('/api');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box m={2}>
        <Box>
          <AppHeading>
            <Box display="inline-block" mr={1}>
              <img
                alt="give-your-best-logo"
                src="https://le-cdn.website-editor.net/d2225289b8824285a45b94181e06cee3/dms3rep/multi/opt/LOGO1+square-320w.png"
                height="50px"
                width="50px"
              />
            </Box>
            <span style={{ verticalAlign: 'super' }}>
              Give Your Best webshop
            </span>
          </AppHeading>
        </Box>
        <i>{message}</i>
        <Box mt={1}>
          <Button>I'm a button!</Button>
          <Button primary>I'm a primary button</Button>
          <Button round>I'm a round button</Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
