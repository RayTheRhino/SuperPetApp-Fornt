import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Navbar from "./components/Navbar/Navbar";
import ChatPage from "./pages/ChatPage/ChatPage";
import ParkPage from "./pages/ParkPage/ParkPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import OnlineStorePage from "./pages/OnlineStorePage/OnlineStorePage";
import CartPage from "./pages/OnlineStorePage/onlineShopPages/CartPage";
import { ShopContextProvider } from './pages/OnlineStorePage/onlineShopPages/Context/ShopContext';
// import ManagerPage from './pages/ManagerPage/ManagerPage';
import PaymentPage from './pages/OnlineStorePage/onlineShopPages/Componenets/PaymentPage';

function App() {
  return (
    <div className="App">
        <ShopContextProvider>
        <ShopContextProvider>
        <BrowserRouter>
            <Navbar/>
            <div>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/register" element={<SignUpPage/>} />
                    <Route path='/shop' element={<ShopPage/>} />
                    <Route path='/onlineShop' element={<OnlineStorePage/>} />
                    <Route path='/parks' element={<ParkPage/>} />
                    <Route path='/chat' element={<ChatPage/>} />
                    {/* outter route */}
                    <Route path='/onlineShop/cart' element={<CartPage/>}/>
                    {/* ManagerPage for putting products in website */}
                    {/* <Route path='/managerPage' element={<ManagerPage/>}/> */}
                    <Route path='/onlineShop/cart/paymentPage' element={<PaymentPage/>}/>
                </Routes>

            </div>
        </BrowserRouter>
        </ShopContextProvider>
        </ShopContextProvider>
    </div>
  );
}

export default App;
