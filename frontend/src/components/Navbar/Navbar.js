import { BsHeart } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { methodContext } from "../../App";
import "./Navbar.css"

export const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, isLoggedIn, setIsLoggedIn } =
    useContext(methodContext);

    const handleHeart =() => {

    }

  const logout = () => {
    localStorage.clear();
    setToken("");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="Navbar">
 <h1 className="welcome"> Welcome in SooqCom</h1>
         {/* <Link className="link" to="/login">Login</Link>
          <Link className="link" to="/register">Register</Link> */}
      {isLoggedIn ? (
        <><Link className="link"  to="/dashboard">
        Dashboard
      </Link>
   

      <button className="logout" onClick={logout}>
        Logout
      </button>
      
      </>
      ) : (
        <>
          <Link className="link" to="/login">Login</Link>
          <Link className="link" to="/register">Register</Link>
        </>
      )}

      <button className="logout"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
};
