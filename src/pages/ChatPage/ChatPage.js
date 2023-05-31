import React, { useEffect, useState } from "react";
import "./ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [latestMessage, setLatestMessage] = useState({});
  const alias = "baba";

  const handleNewMessage = async (event) => {

    event.preventDefault();
    const input = event.target.elements.message;
    const newMessage = {
      id: messages.length + 1,
      text: input.value,
      timestamp: Date.now(),
    };
    console.log(newMessage);
    setLatestMessage((prevLatestMessage) => { return { ...newMessage };});
    console.log(latestMessage);
    setMessages([...messages, newMessage]);
    input.value = "";
    console.log("Message: " + latestMessage.text);
  };
  useEffect(() => {
    // getMessages();
    // console.log(messages);
    if (Object.keys(latestMessage).length !== 0) { 
         handleMessageSent();
    }
   
  }, [latestMessage]);
// useEffect(()=>{
//     getMessages();
// },[])
  
  const handleMessageSent = async () => {
    const type = "message";
    if (Object.keys(latestMessage).length !== 0) { 
    await fetch(
      "http://localhost:3306/superapp/objects?userSuper=SuperPetApp&&userEmail=test_super@email.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          alias: alias,
          active: true,
          location: {
            lat: 0.0,
            lng: 0.0,
          },
          createdBy: {
            userId: {
              superapp: "SuperPetApp",
              email: "test_super@email.com",
            },
          },
          objectDetails: latestMessage,
        }),
      }
      
    )
      .then((response) => {
        //     check if brough something else this is not woek
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const getMessages = async () => {
    const request = {
      command: "GetAllMessages",
      targetObject: {
        objectId: {
          superapp: "SuperPetApp",
          internalObjectId: "1",
        },
      },
      invocationTimestamp: "2023-05-05T16:10:04.018+00:00",
      invokedBy: {
        userId: {
          superapp: "SuperPetApp",
          email: "hdudtototo@gmail.com",
        },
      },
      commandAttributes: {
        size: 10,
        page: 0,
      },
    };
    

    await fetch("http://localhost:3306/superapp/miniapp/miniAppName", {
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
            timestamp: Date(item.objectDetails.timestamp),
          };
        });
        setMessages(messagesArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleNewMessage(event);
  };

  return (
    <div className="chat-container">
      <h2 id="qa"> Ask The Vet</h2>
      <ul id="chat-ul" className="chat-mess">
        {messages.map((message) => (
          <li id="chat-li" key={message.id}>
            <strong>{message.timestamp}: </strong>
            {message.text}
          </li>
        ))}
      </ul>
      <form id="chat-form" onSubmit={handleSubmit}>
        <input
          id="text-area"
          type="text"
          name="message"
          placeholder="Type your message here"
        />
        <button id="send-btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
