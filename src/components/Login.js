import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const logIn = () => {

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