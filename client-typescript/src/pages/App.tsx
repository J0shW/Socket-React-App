import React from 'react';
import '../App.css';
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const socket = io("http://localhost:3001");

function App() {
	const navigate = useNavigate();

	//Room State
	const [selectedRoom, setSelectedRoom] = useState('');
	const [roomList, setroomList] = useState([]);
	const [newRoomName, setNewRoomName] = useState('');

	// Messages States
	const [message, setMessage] = useState('');
	const [receivedMessage, setReceivedMessage] = useState('');
	const [messageList, setMessageList] = useState<string[]>([]);

	const joinRoom = () => {
		if (selectedRoom !== "") {
			console.log('join', selectedRoom)
			socket.emit("join_room", selectedRoom);
			navigate("/draw");
		}
	};

	const sendMessage = () => {
		socket.emit("send_message", { message, selectedRoom });
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
			<header>
				<h1>Pixel Playground</h1>
			</header>
			<main>
				<div className='createRoomContainer'>
					<h1>Create a room</h1>
					<input
						placeholder="New Room..."
						onChange={(event) => {
						setNewRoomName(event.target.value);
						}}
					/>
					<button onClick={createRoom}>Create Room</button>
					{/* <input
						placeholder="Message..."
						onChange={(event) => {
						setMessage(event.target.value);
						}}
					/>
					<button onClick={sendMessage}> Send Message</button> */}
				</div>
				<div className='joinRoomContainer'>
					<h1>Join a room</h1>
					<div className='roomList'>
						{roomList.map((room, index) => 
							<div 
								key={index}
								className={selectedRoom === room ? 'selectedRoom roomItem' : 'roomItem'}
								onClick={() => setSelectedRoom(room)}
							>
								{room}
							</div>)
						}
					</div>
					<button onClick={joinRoom}>Join Room</button>
				</div>
			</main>
		</div>
	);
}

export default App;
