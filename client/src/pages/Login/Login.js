import React, { useState, useContext, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../context/app-context';
import { required } from '../../helpers/field-validation';
import { loginUser } from '../../services/user';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

export const Login = () => {
  const [, setCookie] = useCookies();
  const { setUser, setToken } = useContext(AppContext);
  let history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const form = useRef();

  useEffect(() => {
    if (username || password) {
      setErrorMessage('');
    }
  }, [username, password]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const res = await loginUser({ username, password });
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      setCookie('jwt_user', res.token, { path: '/' });
      history.push('/');
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div data-testid="LoginRoute">
      <h2>Login</h2>
      <Form onSubmit={handleLoginSubmit} ref={form}>
        <div>
          <label htmlFor="username" style={{ marginRight: 16 }}>
            Username
          </label>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            validations={[required]}
          />
        </div>
        <div>
          <label htmlFor="password" style={{ marginRight: 16 }}>
            Password
          </label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            validations={[required]}
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button>login</button>
      </Form>
    </div>
  );
};
