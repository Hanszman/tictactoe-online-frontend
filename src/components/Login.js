import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';

function Login() {
    const cookies = new Cookies();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const logIn = () => {
        Axios.post('http://localhost:3001/login',
            {
                username,
                password
            }
        ).then(
            res => {
                const { token, userId, firstName, lastName, username } = res.data;
                cookies.set('token', token);
                cookies.set('userId', userId);
                cookies.set('firstName', firstName);
                cookies.set('lastName', lastName);
                cookies.set('username', username);
            },
            err => {
                console.log(err);
            }
        );
    };

    return (
        <div className="login">
            <label>Login!</label>
            <input
                type="text"
                placeholder="Username"
                onChange={
                    (event) => {
                        setUsername(event.target.value);
                    }
                }
            />
            <input
                type="password"
                placeholder="Password"
                onChange={
                    (event) => {
                        setPassword(event.target.value);
                    }
                }
            />
            <button onClick={logIn}>Login</button>
        </div>
    );
}

export default Login;