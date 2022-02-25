import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { required, checkemail, checkpassword } from '../../helpers/field-validation';
import { registerUser } from '../../services/user';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

export const Register = () => {
    let history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const form = useRef();
    const checkBtn = useRef();

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            const res = await registerUser({ email, username, password });
            if (res.success) {
                history.push('/');
            } else {
                setErrorMessage(res.message);
            }
        } else {
            setErrorMessage('Check fields');
        }
    };

    return (
        <div>
            <h2>Sign up</h2>
            <Form onSubmit={handleRegisterSubmit} ref={form}>
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
                    <label htmlFor="email" style={{ marginRight: 16 }}>
                        Email address
                    </label>
                    <Input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        validations={[required, checkemail]}
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
                <div>
                    <label htmlFor="passwordConfirm" style={{ marginRight: 16 }}>
                        Confirm Password
                    </label>
                    <Input
                        type="password"
                        name="confirm"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        validations={[required, checkpassword]}
                    />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button>Sign up</button>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
      );
}