import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from './components/Navbar/Navbar'
import Type from './components/TypeWritter/typeWritter'
import ConnectUsPage from "./pages/ConnectUsPage/ConnectUsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Navbar from "./components/Navbar/Navbar";

const typeWritter = ["apple, pears, bananas"];
function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <Navbar/>
            <div>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/register" element={<SignUpPage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/connect-us" element={<ConnectUsPage/>} />
                </Routes>

            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
