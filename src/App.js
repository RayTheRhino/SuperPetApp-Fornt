import "./App.css";
import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Navbar from "./components/Navbar/Navbar";
import ChatPage from "./pages/ChatPage/ChatPage";
import ParkPage from "./pages/ParkPage/ParkPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import OnlineStorePage from "./pages/OnlineStorePage/OnlineStorePage";
import CartPage from "./pages/OnlineStorePage/onlineShopPages/CartPage";
import { ShopContextProvider } from "./pages/OnlineStorePage/onlineShopPages/Context/ShopContext";
import PaymentPage from "./pages/OnlineStorePage/onlineShopPages/Componenets/PaymentPage";
import UserContext from "./context/UserContext";



function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  //Function to update the logged-in user
  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  // Function to clear the logged-in user
  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <UserContext.Provider value={{ loggedInUser, handleLogin, handleLogout }}> 
    <div className="App">
      <ShopContextProvider>
        <BrowserRouter>
          <Navbar />
          <div>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<SignUpPage />} />
              {/* need to add a welcome page */}

              {/* Protected Routes */}
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/onlineShop" element={<OnlineStorePage />} />
              <Route path="/parks" element={<ParkPage />} />
              <Route path="/chat" element={<ChatPage />} />
              {/* inner route */}
              <Route path="/onlineShop/cart" element={<CartPage />} />
              <Route path="/onlineShop/cart/paymentPage" element={<PaymentPage />}/>

              {/* catch all */}
              {/* maybeadd missing page route */}
            </Routes>
          </div>
        </BrowserRouter>
      </ShopContextProvider>
    </div>
</UserContext.Provider> 

  );
}

export default App;
