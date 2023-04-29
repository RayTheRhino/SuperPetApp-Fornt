import {useState} from "react";
import {Link} from "react-router-dom";
import './SignUpPage.css'



const SignUpPage = () => {
    const[email,setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [username, setUsername] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3306/superapp/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                username: username,
                role: "ADMIN",
                avatar: "J"
            })
        }).then(response =>{
        //     check if brough something else this is not woek

        }).catch(error =>{
            console.log(error);
        });

    }
    return (
        <div className='box'>
            <div className='left'>
                <div className="image">
                    <img id='sign-page' src={require('./undraw_Group_selfie_re_h8gb.png')}/>
                </div>
            </div>
            <div className='line'></div>
            <div className='right'>
                <div className="container">
                    <h2>Join Us</h2>
                    <h5> Create Account </h5>
                    <form action="/" onSubmit={handleSubmit}>
                        <p>
                            <label>Username </label>
                            <input id="user-in" type="text" varlue={username} onChange={(e) =>setUsername(e.target.value)}/>
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
                        <p>Already have an account?  <Link to="/" >Login</Link></p>
                    </footer>
                    </div>
            </div>
        </div>

    )
}
export default SignUpPage;