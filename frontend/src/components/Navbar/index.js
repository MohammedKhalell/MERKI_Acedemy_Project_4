import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./style.css";
import { appContext } from "../../App";

//-----------------------------

const Navbar = () => {
  const navigate = useNavigate();
  const { setIsLogedIn, setSearch, setToken, token, productsInCart } =
    useContext(appContext);

  const toLogout = () => {
    setIsLogedIn(false);
    setToken("");
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="nav">
      <div className="cart1">
        <p className="cart-num">{productsInCart}</p>
        <svg
          onClick={() => navigate(`/cart`)}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          className="cart2"
          viewBox="0 0 16 16"
        >
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
        </svg>
      </div>
      {token === "" ? (
        <Link className="bar-link" to={"/login"}>
          Login
        </Link>
      ) : (
        <Link onClick={toLogout} className="bar-link" to={"/login"}>
          Sing out
        </Link>
      )}
      <div className="nav-items">
        <Link className="bar-link" to={"/home"}>
          Home
        </Link>
      </div>
      <div className="search">
        <input
          className="search-input"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type={"text"}
          placeholder={"Search..."}
        ></input>
      </div>

      <div className="img-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="40"
          fill="white"
          className="bi bi-laptop-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 2A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
        </svg>
        <span>e</span>-markt
      </div>
    </div>
  );
};

export default Navbar;
