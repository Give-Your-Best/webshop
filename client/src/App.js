import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AppWrapper, Header } from './components';
import { theme } from './theme';
import { Routes } from './Routes';
import { AppProvider } from './context/app-context';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <BrowserRouter>
          <AppWrapper>
            <Header />
            <Routes />
          </AppWrapper>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
