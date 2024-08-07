import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';

function Signup({setIsAuth}) {
    const cookies = new Cookies();
    const [user, setUser] = useState(null);
    const signUp = () => {
        Axios.post('http://localhost:3001/signup', user).then(
            res => {
                const { token, userId, firstName, lastName, username, hashedPassword } = res.data;
                cookies.set('token', token);
                cookies.set('userId', userId);
                cookies.set('firstName', firstName);
                cookies.set('lastName', lastName);
                cookies.set('username', username);
                cookies.set('hashedPassword', hashedPassword);
                setIsAuth(true);
            },
            err => {
                console.log(err);
                setIsAuth(false);
            }
        );
    };

    return (
        <div className="signup">
            <label>Signup</label>
            <input
                type="text"
                placeholder="First Name"
                onChange={(event) => setUser({...user, firstName: event.target.value})}
            />
            <input
                type="text"
                placeholder="Last Name"
                onChange={(event) => setUser({...user, lastName: event.target.value})}
            />
            <input
                type="text"
                placeholder="Username"
                onChange={(event) => setUser({...user, username: event.target.value})}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(event) => setUser({...user, password: event.target.value})}
            />
            <button onClick={signUp}>Signup</button>
        </div>
    );
}

export default Signup;