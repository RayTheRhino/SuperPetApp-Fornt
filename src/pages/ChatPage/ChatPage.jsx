import React, { useState } from 'react';
import './ChatPage.css'
const ChatPage = () => {
    const [messages, setMessages] = useState([]);

    const handleNewMessage = (event) => {
        event.preventDefault();
        const input = event.target.elements.message;
        const newMessage = {
            id: messages.length + 1,
            text: input.value,
            timestamp: Date.now()
        };
        setMessages([...messages, newMessage]);
        input.value = '';
    };

    return (
        <div className='chat-container'>
            <h2 id='qa'> Ask The Vet</h2>
            <ul id='chat-ul' className='chat-mess'>
                {messages.map((message) => (
                    <li id='chat-li' key={message.id}>
                        <strong>{message.timestamp}: </strong>
                        {message.text}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleNewMessage}>
                <input type="text" name="message" placeholder="Type your message here" />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatPage;
