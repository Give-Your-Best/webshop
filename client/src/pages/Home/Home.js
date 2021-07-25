import * as React from 'react';
import { Header, ItemCard, Container } from '../../components';
import { getItems } from '../../services/items';
import { AppWrapper, FiltersWrapper, ItemsWrapper } from './Home.styles';

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
    <AppWrapper data-testid="HomeRoute">
      <Header />
      <Container>
        <FiltersWrapper mt={1}>
          <span>Filters selection (by size, colour, etc)</span>
        </FiltersWrapper>
        <ItemsWrapper my={1} mx={-1} display="flex" flexWrap="wrap">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </ItemsWrapper>
      </Container>
    </AppWrapper>
  );
};
