import "./App.css";
import React , {createContext, useState} from 'react';
import AddArticle from "./components/AddArticle";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
export const othuser =createContext()

function App() {
  const [token, setToken] = useState(''||localStorage.getItem("Token"));
  
  return (
    <othuser.Provider value={{token,setToken}}>
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addArticle" element={<AddArticle />} />
      </Routes>
    </div>
    </othuser.Provider>
  );
}

export default App;
