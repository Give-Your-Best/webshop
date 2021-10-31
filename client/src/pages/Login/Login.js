import * as React from 'react';
import { useHistory } from 'react-router-dom';

const loginUser = async ({ username, password }) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in loginUser: ${error}`);
    return error;
  }
};

export const Login = () => {
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
    console.log('res!', res);
    if (res.success) {
      // set global state with user obj + token (?)
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
