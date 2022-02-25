import * as React from 'react';
import { ItemCard, Container } from '../../components';
import { getItems } from '../../services/items';
import { FiltersWrapper, ItemsWrapper } from './Home.styles';

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
    <Container data-testid="HomeRoute">
      <FiltersWrapper mt={1}>
        <span>Filters selection (by size, colour, etc)</span>
      </FiltersWrapper>
      <ItemsWrapper my={1} mx={-1} display="flex" flexWrap="wrap">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </ItemsWrapper>
    </Container>
  );
};
