import './App.css';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import { StreamChat } from 'stream-chat'
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();
  const api_key = 'b52r7nyk5b8v';
  const token = cookies.get('token');
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);
  if (token) {
    client.connectUser(
      {
        id: cookies.get('userId'),
        name: cookies.get('username'),
        firstName: cookies.get('firstName'),
        lastName: cookies.get('lastName'),
        hashedPassword: cookies.get('hashedPassword')
      },
      token
    ).then((user) => {
      console.log(user);
      setIsAuth(true);
    });
  }
  return (
    <div className="App">
      <Signup setIsAuth={setIsAuth}/>
      <Login setIsAuth={setIsAuth}/>
    </div>
  );
}

export default App;
