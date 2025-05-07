import React, {useState} from 'react'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import {ChannelListContainer, ChannelContainer, Auth} from './components'

import './App.css';
import LoadingScreen from './components/LoadingScreen';
import Home from './components/Home';

const cookies = new Cookies();

const apiKey = '8jeb2ubf7pe4'; //1379113
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken) {
  client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Router>
      <Routes>
      <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/chat"
          element={
            authToken ? (
              <div className="app__wrapper">
                <Chat client={client} theme="team light">
                  <ChannelListContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                  />
                  <ChannelContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                  />
                </Chat>
              </div>
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};


export default App;