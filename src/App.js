import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

function App() {
  const [text, setText] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');
  const [joined, setJoined] = useState(false);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    socket.on('update', (data) => {
      setText(data);
    });

    socket.on('roomJoined', ({ roomName, username }) => {
      setCurrentRoom(roomName);
      setJoined(true);
      setUsername(username);
    });

    socket.on('roomCreated', ({ roomName, username }) => {
      setCurrentRoom(roomName);
      setJoined(true);
      setUsername(username);
    });

    socket.on('roomLeft', () => {
      setCurrentRoom('');
      setJoined(false);
      setUsername('');
    });

    socket.on('updateUsers', (users) => {
      setUsersInRoom(users);
    });

    socket.on('joinRoomError', (errorMessage) => {
      setError(errorMessage);
    });

    socket.on('createRoomError', (errorMessage) => {
      setError(errorMessage);
    });

    socket.on('leaveRoomError', (errorMessage) => {
      setError(errorMessage);
    });

    socket.on('invalidPassword', () => {
      setError('Invalid password. Please try again.');
    });

  }, []);

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit('update', { room: currentRoom, text: newText });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const createRoom = () => {
    setError(''); // Reset error state
    socket.emit('createRoom', { username, password });
  };

  const joinRoom = () => {
    setError(''); // Reset error state
    if (currentRoom && !joined) {
      socket.emit('joinRoom', { roomName: currentRoom, username, password });
    }
  };

  const leaveRoom = () => {
    socket.emit('leaveRoom', { roomName: currentRoom, username });
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter room password"
        />
        <button onClick={createRoom} disabled={!username || !password}>
          Create Room
        </button>
        <input
          type="text"
          value={currentRoom}
          onChange={(e) => setCurrentRoom(e.target.value)}
          placeholder="Enter room name"
          disabled={joined}
        />
        <button onClick={joinRoom} disabled={!currentRoom || joined || !password || !username}>
          Join Room
        </button>
        {currentRoom && joined && (
          <button onClick={leaveRoom}>Leave Room</button>
        )}
      </div>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      {currentRoom && joined && (
        <div className="users-list">
          <h2>Users in Room:</h2>
          <ul>
            {usersInRoom.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}
      {currentRoom && joined && (
        <textarea
          value={text}
          onChange={handleInputChange}
          style={{ width: '100%', height: '300px' }}
          placeholder="Collaborative Text Editor"
        />
      )}
    </div>
  );
}

export default App;
