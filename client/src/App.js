import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AppWrapper, Header } from './components';
import { theme } from './theme';
import { Home, Item, Login } from './pages';
import { AppProvider } from './context/app-context';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <BrowserRouter>
          <AppWrapper data-testid="HomeRoute">
            <Header />
            <Switch>
              <Route path={`/item/:itemId`}>
                <Item />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </AppWrapper>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
