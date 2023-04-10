import {useState} from "react";
const SignUpPage = () => {
    const[email,setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword]= useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

    }
    return (
        <div>
            <from onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </label>
                <br/>
                <button type="submit">Login</button>
            </from>
        </div>

    )
}
export default SignUpPage;