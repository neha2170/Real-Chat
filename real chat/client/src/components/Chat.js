import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import './Chat.css';

const socket = io('http://localhost:4000');

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('initialMessages', (initialMessages) => {
            setMessages(initialMessages);
        });

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('initialMessages');
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', message);
            setMessage('');
        }
    };

    return (
        // <div className="chat-container">
        //     {/* <div className="chat-header">Chat App</div> */}
        //     <MessageList messages={messages} />
        //     <div className="message-input-container">
        //         <input
        //             type="text"
        //             className="message-input"
        //             value={message}
        //             onChange={(e) => setMessage(e.target.value)}
        //         />
        //         <button className="send-button" onClick={sendMessage}>Send</button>
        //     </div>
        // </div>
        <div className="chat-container">
        <MessageList messages={messages} />
        <div className="message-input-container">
            <input
                type="text"
                className="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="send-button" onClick={sendMessage}>Send</button>
        </div>
    </div>
    );
};

export default Chat;
