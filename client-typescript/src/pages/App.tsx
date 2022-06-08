import React from 'react';
import '../App.css';
import { useState } from "react";
import Home from './Home';
import Draw from './Draw';

function App() {
	//Room State
	const [room, setRoom] = useState<string | undefined>(undefined);
	
	return (
		<div className="App">
			{!room 
				? <Home setRoom={setRoom} room={room} />
				: <Draw room={room} />
			}
		</div>
	);
}

export default App;
