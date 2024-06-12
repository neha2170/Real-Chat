import React from 'react';
import './Chat.css';

const Message = ({ message }) => {
    return <div className="message">{message}</div>;
};

export default Message;
