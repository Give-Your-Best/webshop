import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { Home } from './pages';

const Users = () => (
  <div>
    <h1>users</h1>
    <Link to="/about">go to about</Link>
  </div>
);

const User = () => {
  let { userId } = useParams();
  return (
    <div>
      <h1>{`user!!! ${userId}`}</h1>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/about">
            <div> about</div>
          </Route>
          <Route path={`/user/:userId`}>
            <User />
          </Route>
          <Route path="/user">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
