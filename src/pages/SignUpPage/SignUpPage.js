import {useState} from "react";
import './SignUpPage.css';
import {Link} from "react-router-dom";


const SignUpPage = () => {
    const[email,setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [username, setUsername] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

    }
    return (
        <div className="container">
            <h2>Join Us</h2>
            <h5> Create Account </h5>
            <form action="/" onSubmit={handleSubmit}>
                <p>
                    <label>Username </label>
                    <input id="user-in" type="text" value={username} onChange={(e) =>setUsername(e.target.value)}/>
                </p>
                <p>
                    <label>Email </label>
                    <input id="email-in" type="email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
                </p>
                <p>
                    <label>Password </label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </p>
                <p>
                <button  id="btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p>Alreay have an account?  <Link to="/login" >Login</Link></p>
            </footer>
        </div>

    )
}
export default SignUpPage;