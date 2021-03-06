const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let roomList = ['Green Room'];

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("get_room_list", () => {
    console.log('get room list');
    socket.emit('room_list', roomList);
  });

  socket.on("create_room", (data) => {
    console.log('create room:', data)
    socket.join(data);
    roomList = [...roomList, data];
    console.log('updated room list:', roomList)
    io.emit('room_list', roomList);
  });

  socket.on("join_room", (data) => {
    console.log('join room', data)
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log('send message', data)
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
