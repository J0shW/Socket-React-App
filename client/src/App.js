import "./App.css";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";

const socket = io.connect("http://localhost:3001");

// FIGMA: https://www.figma.com/file/V20Qzco08p1jz822n6j6gk/Untitled?node-id=0%3A1
function App() {
  //Room State
  const [room, setRoom] = useState("");
  const [roomList, setroomList] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  const createRoom = () => {
    socket.emit("create_room", newRoomName);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
    });

    socket.on("room_list", (roomList) => {
      console.log('roomList', roomList);
      setroomList(roomList);
    });
  }, [socket]);

  useEffect(() => {
    setMessageList([...messageList, receivedMessage]);
  }, [receivedMessage])
  


  return (
    <div className="App">
      <input
        placeholder="Room Name..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="New Room..."
        onChange={(event) => {
          setNewRoomName(event.target.value);
        }}
      />
      <button onClick={createRoom}> Create Room</button>
      {/* <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button> */}
      <h1> Message:</h1>
      {messageList.map((message, index) => <p key={index}>{message}</p>)}
      {roomList.map((room, index) => <p key={index}>{room}</p>)}
    </div>
  );
}

export default App;
