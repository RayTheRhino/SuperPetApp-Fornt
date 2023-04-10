import './App.css';
import React from "react";
import Nav from './components/navbar'
import {Routes, Route} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import Type from './components/typeWritter'
import Login from "./pages/LoginPage/LoginPage";

const typeWritter = ["apple, pears, bananas"];
function App() {
  return (
    <div className="App">
    {/*<Routes>*/}
    {/*  <Route path="/" element={}/>*/}
    {/*</Routes>*/}

      <Type/>
        <Login/>
      <Nav/>
    </div>
  );
}

export default App;
