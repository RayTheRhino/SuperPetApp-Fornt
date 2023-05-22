import React, {useEffect, useState} from 'react';
import './ChatPage.css'
const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [latestMessage,setLatestMessage] = useState({});
    const handleNewMessage = (event) => {
        event.preventDefault();
        const input = event.target.elements.message;
        const newMessage = {
            id: messages.length + 1,
            text: input.value,
            timestamp: Date.now()
        };
        setLatestMessage(newMessage);
        setMessages([...messages, newMessage]);
        input.value = '';
        console.log("Message: " + latestMessage.text);
    };

    const handleMessageSent =(event) =>{
        const type= "message";
        event.preventDefault();
        fetch('http://localhost:3306/superapp/objects', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                type: type,
                alias: " ",
                active: true,
                location: {
                    "lat" : 0.0,
                    "lng" : 0.0
                },
                createdBy:{
                    "userId": {
                        "superapp": "asdfg",
                        "email": "sdggwgfd"
                    }
                },
                objectDetails: {
                    message: latestMessage.text,
                    id: latestMessage.id,
                    timestamp: latestMessage.timestamp
                }
            })
        }).then(response => {
            //     check if brough something else this is not woek

        }).catch(error => {
            console.log(error);
        });
    };

    const getMessages = () => {
        const request = {
            command: "GetAllMessages",
            targetObject: {
                objectId: {
                    superapp: "2023b.demo",
                    internalObjectId: "1",
                },
            },
            invocationTimestamp: "2023-05-05T16:10:04.018+00:00",
            invokedBy: {
                userId: {
                    superapp: "2023b.demo",
                    email: "jane@demo.org",
                },
            },
            commandAttributes: {
                key1: {
                    key1Subkey: "once a wish upon a star",
                },
            },
        };

        fetch("http://localhost:3306/superapp/miniapp/name", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        })
            .then((response) => response.json())
            .then((data) => {
                const messagesArray = data.map((item) => {
                    return {
                        id: item.objectDetails.id,
                        message: item.objectDetails.message,
                        timestamp: item.objectDetails.timestamp
                    };
                });
                setMessages(messagesArray);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getMessages();
    }, []);



    const handleSubmit = (event) => {
        event.preventDefault();
        handleNewMessage(event);
        handleMessageSent(event);
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
            <form id='chat-form' onSubmit={handleSubmit}>
                <input id='text-area' type="text" name="message" placeholder="Type your message here" />
                <button id='send-btn' type="submit">Send</button>
            </form>
        </div>git
    );
};

export default ChatPage;
