import { useState, useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import UserContext from "../../context/UserContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const superapp = "SuperPetApp";
  const navigate = useNavigate();
  const { handleLogin } = useContext(UserContext);

  useEffect(() => {
    if (role !== "") {
      handleLogin({ username, email, role });
      navigate("/onlineShop");
    }
  }, [role, handleLogin, username, email]);


  const sendLoginRequest = async () => {
    try {
      
      await fetch(
        `http://localhost:3306/superapp/users/login/${superapp}/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status!== 200){
          console.log("Failed to login")
          throw new Error("Login failed!")
        }
        return response.json()
      }).then((data) => {
            setEmail(email);
            setUsername(username);
            setRole(data.role);
            
            
        })
        .catch((error) => {
          console.log(error);
        });
        

    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div className="box">
      <div className="left">
        <div className="image">
          <img className="login-img" src={require("./login.png")} />
        </div>
      </div>
      <div className="line-login"></div>
      <div className="right">
        <div className="container">
          <h2>Sign In</h2>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              sendLoginRequest();
            }}
          >
            <p>
              <label>Email</label>
              <input
                id="email-in"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>
            <p>
              <label>Username</label>
              <input
                id="pass-in"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </p>
            <p>
              <button id="btn" type="submit">
                Login
              </button>
            </p>
          </form>
          <footer>
            <p>
              First time? <Link to="/register">Create an account</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
