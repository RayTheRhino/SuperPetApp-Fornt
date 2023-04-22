import React, { useState, useEffect } from "react";
import './ChatPage.css'

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    // Function to handle sending a message
    const handleSendMessage = () => {
        if (inputValue.trim() === "") return; // Do not send empty messages
        setMessages([...messages, inputValue]);
        setInputValue(""); // Reset input field
    };

    // Function to handle input field changes
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Handle pressing Enter key to send message
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    useEffect(() => {
        // Scroll to bottom of chat window after new message is added
        const chatWindow = document.getElementById("chatWindow");
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, [messages]);

    return (
        <div className="chat-app">
            <div id="chatWindow" className="chat-window">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;