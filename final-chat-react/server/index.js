require('dotenv/config');

//Entry point for our server, using 1 file
//Using express and socket.io 
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express() //instance of express
const http = require('http') //To build our server to work with socket io
const cors = require('cors'); //Extremely important for socket.io
const {
    Server
} = require('socket.io'); //Want to implement a class from socket.io library
app.use(cors()) //cors dataware to resolve issues
const server = http.createServer(app) //Pass the express server

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5000", //Tell our server which url where react app is running, localhost
        methods: ["GET", "POST"]
    }
}) //Pass server we first created (to connect express), 

//io works on events, certain events are already built into socket, like connection. Every piece of code should be inside here, to check if user connected. Every event is within the callback function based on socket event.
//ex socket.id

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on('join_room', (data) => { //passing front end
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })
    socket.on('send_message', (data) => {
        console.log(data);
        socket.to(data.room).emit('receive_message', data) //Sends to every user in the same chat
    })

    socket.on('disconnect', () => {
        console.log(`User Disconnected: ${socket.id}`);
    })
})

server.listen(PORT, () => {
    //Call function passed to console log a message
    console.log("Server running on", PORT);
})

const publicPath = path.join(__dirname, 'public');
const staticMiddleware = express.static(publicPath);
app.use(staticMiddleware);