import * as React from 'react';
import styled from 'styled-components';
import { AppHeading, Box, ItemCard, Container } from '../../components';
import { getItems } from '../../services/items';
import logo from './gyb_logo.png';

export const Home = () => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setItems(items);
    };
    fetchItems();
  }, []);

  return (
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
          <span style={{ verticalAlign: 'middle' }}>
            Give Your Best webshop
          </span>
        </AppHeading>
      </Box>
      <Container>
        <FrontPanel>
          <span>
            Panel with info/news/latest items/hot right now/big sizes/other
          </span>
        </FrontPanel>
        <FiltersWrapper mt={1}>
          <span>Filters panel (by size, colour, etc)</span>
        </FiltersWrapper>
        <ItemsWrapper my={1} mx={-1} display="flex" flexWrap="wrap">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </ItemsWrapper>
      </Container>
    </Box>
  );
};

const ItemsWrapper = styled(Box)`
  @media (max-width: 480px) {
    justify-content: space-between;
    margin-left: -0.4rem;
    margin-right: -0.4rem;
  }
`;

const FrontPanel = styled.div`
  background-color: ${({ theme }) => theme.colorMappings.frontPanelBackground};
  height: 10rem;
  padding: 1rem;
  text-align: center;

  &:hover {
    box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.1);
  }
`;

const FiltersWrapper = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colorMappings.borders};
  height: 3rem;
  padding: 0.6rem 1rem;

  &:hover {
    box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.1);
  }
`;
