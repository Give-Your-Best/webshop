import { render, screen } from '../../config/test-utils';
import { Home } from './Home';

describe('<Home />', () => {
  beforeEach(() => {
    render(<Home />);
  });
  it('renders a dropdown selection placeholder for the filters', () => {
    expect(screen.getByText(/Filters selection/i)).toBeInTheDocument();
  });
});
