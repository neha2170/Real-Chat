import React from 'react';
import Chat from './components/Chat';
import MessagesViewer from './components/MessagesViewer';

const App = () => {
    return (
        <div className='container'>
            <h1>Chat App</h1>
            <Chat />
            {/* <MessagesViewer /> */}
        </div>
    );
};

export default App;
