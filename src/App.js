import React from "react";
import CodeEditor from "./components/CodeEditor";
import { useSocket } from "./hooks/useSocket";
import { Layout } from "./components/Layout";
import RoomAuthForm from "./components/RoomAuthForm";

function App() {
  const {
    text,
    currentRoom,
    joined,
    usersInRoom,
    username,
    password,
    error,
    handleEditorChange,
    handleInputChange,
    handlePasswordChange,
    handleUsernameChange,
    createRoom,
    joinRoom,
    leaveRoom,
  } = useSocket();

  return (
    <div>
      {(!currentRoom || !joined) && (
        <RoomAuthForm
          username={username}
          password={password}
          currentRoom={currentRoom}
          error={error}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleRoomChange={handleInputChange}
          createRoom={createRoom}
          joinRoom={joinRoom}
          isJoined={joined}
        />
      )}
      {currentRoom && joined && (
        <Layout room={currentRoom} users={usersInRoom} onLeave={leaveRoom} password={password}>
          <CodeEditor text={text} onChange={handleEditorChange} />
        </Layout>
      )}
    </div>
  );
}

export default App;
