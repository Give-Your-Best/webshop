import * as React from 'react';
import styled from 'styled-components';
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
          <ItemsWrapper my={1} mx={-1} display="flex" flexWrap="wrap">
            {items.map((item) => (
              <ItemCard key={item.id}>{item.name}</ItemCard>
            ))}
          </ItemsWrapper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;

const ItemsWrapper = styled(Box)`
  @media (max-width: 480px) {
    justify-content: space-between;
    margin-left: -0.4rem;
    margin-right: -0.4rem;
  }
`;
