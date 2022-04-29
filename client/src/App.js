import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AllWrapper, AppWrapper, Header, Footer } from './components';
import { theme } from './theme';
import { Routes } from './Routes';
import { AppProvider } from './context/app-context';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <BrowserRouter>
          <AllWrapper>
            <Header />
            <AppWrapper><Routes /></AppWrapper>
            <Footer />
          </AllWrapper>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
