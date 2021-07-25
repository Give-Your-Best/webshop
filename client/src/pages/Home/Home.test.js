import { render, screen } from '../../config/test-utils';
import { Home } from './Home';

describe('<Home />', () => {
  beforeEach(() => {
    render(<Home />);
  });
  it('renders the app header', () => {
    expect(screen.getByTestId('Header')).toBeInTheDocument();
  });
  it('renders a dropdown selection placeholder for the filters', () => {
    expect(screen.getByText(/Filters selection/i)).toBeInTheDocument();
  });
});
