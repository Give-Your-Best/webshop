import { render, screen } from './config/test-utils';
import App from './App';

describe('<App />', () => {
  describe('when on / route', () => {
    beforeEach(() => {
      render(<App />);
    });
    it('renders the home page', () => {
      expect(screen.getByTestId('HomeRoute')).toBeInTheDocument();
    });
    it('renders the app header', () => {
      expect(screen.getByTestId('Header')).toBeInTheDocument();
    });
  });
});
