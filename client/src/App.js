import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppHeading, Box, ItemCard, Container } from './components';
import { theme } from './theme';
import logo from './gyb_logo.png';
import { getItems } from './services/items';

const App = () => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setItems(items);
    };
    fetchItems();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box m={2}>
        <Box>
          <AppHeading>
            <Box display="inline-block" mr={1}>
              <img
                alt="give-your-best-logo"
                src={logo}
                height="50px"
                width="50px"
              />
            </Box>
            <span style={{ verticalAlign: 'super' }}>
              Give Your Best webshop
            </span>
          </AppHeading>
        </Box>
        <Container>
          <Box
            style={{
              backgroundColor: '#db709330',
              height: '10rem',
              borderRadius: '1rem',
              padding: '1rem',
              textAlign: 'center',
            }}
          >
            <span>Panel with latest items/hot right now/big sizes/other</span>
          </Box>
          <Box mt={1}>
            <span>See our available items below~</span>
          </Box>
          <Box my={1} mx={-1} display="flex" style={{ overflowX: 'auto' }}>
            {/* TODO: show in grid */}
            {items.map((item) => (
              <ItemCard>{item.name}</ItemCard>
            ))}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
