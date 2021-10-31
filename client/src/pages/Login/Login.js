import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/app-context';
import { loginUser } from '../../services/user';

export const Login = () => {
  const { setUser, setToken } = React.useContext(AppContext);
  let history = useHistory();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (username || password) {
      setErrorMessage('');
    }
  }, [username, password]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const res = await loginUser({ username, password });
    if (res.success) {
      // TODO: persist in cookies or localstorage
      setUser(res.user);
      setToken(res.token);
      history.push('/');
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="username" style={{ marginRight: 16 }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" style={{ marginRight: 16 }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button>login</button>
      </form>
    </div>
  );
};
