import React from 'react';
import { render, screen } from './config/test-utils';
import App from './App';

describe('<App />', () => {
  describe('when on / route', () => {
    it('renders the home page', () => {
      render(<App />);
      expect(screen.getByTestId('HomeRoute')).toBeInTheDocument();
    });
    it('renders the app header', () => {
      render(<App />);
      expect(screen.getByTestId('Header')).toBeInTheDocument();
    });
  });
});
