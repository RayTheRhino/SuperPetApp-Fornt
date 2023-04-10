import React , {useState} from "react";

function ChatBox(){
    const [messages, setMessage] = useState([]);
    const [input, setInput] = useState("");

    function sendMessage(){
        const timestamp = new Date().toLocaleDateString();
        const message = {sender: 'You', text: input, timestamp};
        setMessage([...messages, message]);

    }
}