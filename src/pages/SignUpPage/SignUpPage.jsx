import {useState} from "react";
import {Link} from "react-router-dom";
import './SignUpPage.css'



const SignUpPage = () => {
    const[email,setEmail] = useState('');
    const[avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');


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
                role: role,
                avatar: avatar
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
            <div className='line-sign'></div>
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
                            <label>Avatar </label>
                            <input id='avatar-in' type="text" value={avatar} onChange={(e)=>setAvatar(e.target.value)}/>
                        </p>
                        <p id='role-p'>
                            <label>Role</label>
                            <select id='select-in' value={role} onChange={(e) =>setRole(e.target.value)}>
                                <option value='ADMIN'>Admin</option>
                                <option value='MINIAPP_USER'>Miniapp User</option>
                                <option value='SUPER_USER'>Super User</option>
                            </select>
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