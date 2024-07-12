import './App.css';
import { useState } from 'react';
import JoinGame from './components/JoinGame';
import Login from './components/Login';
import Signup from './components/Signup';
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();
  const api_key = '';
  const token = cookies.get('token');
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);
  const logOut = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('firstName');
    cookies.remove('lastName');
    cookies.remove('hashedPassword');
    cookies.remove('username');
    client.disconnectUser();
    setIsAuth(false);
  };
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
    ).then(() => {
      setIsAuth(true);
    });
  }
  return (
    <div className="App">
      {
        isAuth
        ? (
          <Chat client={client}>
            <JoinGame/>
            <button onClick={logOut}>Logout</button>
          </Chat>
        )
        : (
          <>
            <Signup setIsAuth={setIsAuth}/>
            <Login setIsAuth={setIsAuth}/>
          </>
        )
      }
    </div>
  );
}

export default App;
