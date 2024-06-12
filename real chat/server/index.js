const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

const messages = []; // This array stores all messages

app.use(cors());

// Endpoint to get all stored messages
app.get('/messages', (req, res) => {
    res.json(messages);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('initialMessages', messages); // Send all stored messages to the newly connected user

    socket.on('sendMessage', (message) => {
        messages.push(message); // Store the new message in the array
        io.emit('message', message); // Broadcast the new message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
