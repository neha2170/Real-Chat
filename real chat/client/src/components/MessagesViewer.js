import React, { useState, useEffect } from 'react';
import './Chat.css';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const MessagesViewer = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch initial stored messages
        fetchMessages();

        // Listen for new messages
        socket.on('message', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        // Clean up socket on component unmount
        return () => {
            socket.off('message');
        };
    }, []);

    const fetchMessages = () => {
        fetch('http://localhost:4000/messages')
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error('Error fetching messages:', error));
    };

    return (
        // <div className="message-list">
        //     <h2>Stored Messages</h2>
        //     {messages.map((msg, index) => (
        //         <div key={index} className="message">{msg}</div>
        //     ))}
        // </div>
        <div className="message-list">
        <h2>Stored Messages</h2>
        {messages.map((msg, index) => (
            <div key={index} className="message">{msg}</div>
        ))}
    </div>
    );
};

export default MessagesViewer;
