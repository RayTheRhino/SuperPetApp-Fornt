import { useState } from "react";
import './ConnectUsPage.scss'

const ConnectUsPage = () => {
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    // const [message, setMessage] = useState("");

    const [message, setMessage] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage(true);
    };

    return (
        <div className="contact" id="contact">
            <div className="left">
                <img src="../../assets/ConnectUsPage.svg" alt="" />
            </div>
            <div className="right">
                <h2>Contact</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" />
                    <textarea placeholder="Message"></textarea>
                    <button type="submit">Send</button>
                    {message && <span>Thanks, I`ll replay ASAP</span>}
                </form>
            </div>
        </div>
    );
};
export default ConnectUsPage;
