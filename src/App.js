import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Navbar from "./components/Navbar/Navbar";
import ChatPage from "./pages/ChatPage/ChatPage";
import ParkPage from "./pages/ParkPage/ParkPage";

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
                    {/*<Route path='/adopt' element={<AdoptPage/>} />*/}
                    {/*<Route path='/shop' element={<ShopPage/>} />*/}
                    <Route path='/parks' element={<ParkPage/>} />
                    <Route path='/chat' element={<ChatPage/>} />
                </Routes>

            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
