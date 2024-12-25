import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL);

export function useSocket() {
  const [text, setText] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("update", setText);
    socket.on("roomJoined", ({ roomName, username }) => {
      setCurrentRoom(roomName);
      setJoined(true);
      setUsername(username);
    });
    socket.on("roomCreated", ({ roomName, username }) => {
      setCurrentRoom(roomName);
      setJoined(true);
      setUsername(username);
    });
    socket.on("roomLeft", () => {
      setCurrentRoom("");
      setJoined(false);
      setUsername("");
    });
    socket.on("updateUsers", setUsersInRoom);
    socket.on("joinRoomError", setError);
    socket.on("createRoomError", setError);
    socket.on("leaveRoomError", setError);
    socket.on("invalidPassword", () =>
      setError("Invalid password. Please try again.")
    );
  }, []);

  const handleEditorChange = (value) => {
    setText(value);
    socket.emit("update", { room: currentRoom, text: value });
  };

  const createRoom = () => {
    setError("");
    socket.emit("createRoom", { username, password });
  };

  const joinRoom = () => {
    setError("");
    if (currentRoom && !joined) {
      socket.emit("joinRoom", { roomName: currentRoom, username, password });
    }
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", { roomName: currentRoom, username });
  };

  return {
    text,
    currentRoom,
    joined,
    usersInRoom,
    username,
    password,
    error,
    setText,
    setUsername,
    setPassword,
    setCurrentRoom,
    handleEditorChange,
    handlePasswordChange: (e) => setPassword(e.target.value),
    handleUsernameChange: (e) => setUsername(e.target.value),
    handleInputChange: (e) => setCurrentRoom(e.target.value),
    createRoom,
    joinRoom,
    leaveRoom,
  };
}
