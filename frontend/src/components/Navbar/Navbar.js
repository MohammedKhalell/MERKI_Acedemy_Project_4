import { BsHeart } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { methodContext } from "../../App";
import "./Navbar.css"

// class Question extends React.Component {
//   render() {
//     return <h3> Lets go for a <FaBeer />? </h3>
//   }
// }

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
      
      {/* <Link className="link" to="/CreateCategory">
        Add New Category
      </Link> */}

      {/* <BsHeart 
      className="icon"
      style={{
        // position: 'absolute',
        top: '20px',
        right: '20px',
      }}
      size="50px"
      color="white"
      // onClick={handleHeart}
      /> */}

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
