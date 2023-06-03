import React, { useEffect, useState, useContext } from "react";
import "./ChatPage.css";
import UserContext from "../../context/UserContext";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [latestMessage, setLatestMessage] = useState({});
  const alias = "baba";
  const { loggedInUser } = useContext(UserContext);

  const handleNewMessage = async (event) => {
    event.preventDefault();
    const input = event.target.elements.message;
    const newMessage = {
      id: messages.length + 1,
      text: input.value,
      timestamp: Date.now(),
      username: loggedInUser.username,
    };

    setLatestMessage((prevLatestMessage) => {
      return { ...newMessage };
    });
   
    setMessages([...messages, newMessage]);
    input.value = ""; //for clean buffer
    console.log("Message: " + latestMessage.text);
  };

  useEffect(() => {
    getMessages();
    if (Object.keys(latestMessage).length !== 0) {
      handleMessageSent();
    }
  }, [latestMessage]);
  useEffect(() => {
    getMessages();
    console.log(loggedInUser);
  }, []);

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
                email: loggedInUser.email,
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
          email: loggedInUser.email,
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
          const timestamp = new Date(item.objectDetails.timestamp);
          const formattedTimestamp = formatDate(timestamp);
          return {
            id: item.objectDetails.id,
            email: item.createdBy.userId.email,
            username:item.objectDetails.username,
            message: item.objectDetails.text,
            timestamp: formattedTimestamp,
          };
        });
        setMessages(messagesArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

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
            <strong>{message.timestamp}:
            {message.username} </strong>
            <br/>
            {message.message}
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
