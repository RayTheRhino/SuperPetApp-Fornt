import {ChangeEvent,useState} from "react";
import {Link} from "react-router-dom";
import './LoginPage.css'


const LoginPage = () => {
    const[email,setEmail] = useState('');
    const[password, setPassword] = useState('');
    const superapp = '2023b.tal.benita'

    const sendLoginRequest = async (email, password) =>{
        try{
            console.log(email);
            console.log(password);

            const response = await fetch(`http://localhost:3306/superapp/users/login/${superapp}/${email}`);
            const data = await  response.json();
            console.log(data);
        }catch (error){
            console.log(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sendLoginRequest(email,password)

    }
    return (
        <div className='box'>
            <div className='left'>
                <div className="image">
                    <img className='login-img' src={require('./login.png')}/>
                </div>
            </div>
            <div className='line-login'></div>
            < div className='right'>
                <div className="container">
                    <h2>Sign In</h2>
                    <form id='login-form' action="/home" onSubmit={handleSubmit}>
                        <p>
                            <label>Email</label>
                            <input id='email-in' type="email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
                        </p>
                        <p>
                            <label>Password</label>
                            <input id='pass-in' type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </p>
                        <p>
                            <button id='btn' type="submit">Login</button>
                        </p>
                    </form>
                    <footer>
                        <p>First time? <Link to="/register" >Create an account</Link></p>
                    </footer>
                    </div>
                </div>
        </div>

    )
}
export default LoginPage;