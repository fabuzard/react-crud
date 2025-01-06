import Navbar from "./Navbar";
import Home from './pages/home'
import Login from './pages/login'
import HomePage from "./pages/homePage";
import Register from "./pages/register"
import React, { useState } from 'react';
import {Route,Routes} from "react-router-dom"
export const Context = React.createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout=()=>{
    setIsLoggedIn(false)
    localStorage.removeItem('token'); 
    console.log("test")
  }
  return (
    <div>
     
      <Context.Provider value={[isLoggedIn,setIsLoggedIn,logout]}>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
      
      </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
