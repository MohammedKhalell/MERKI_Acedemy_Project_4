import React, { useState, useContext,useEffect } from "react";
import axios from "axios";
import { methodContext } from "../../App";

import { useNavigate } from "react-router-dom";
import "./Login.css"


export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { token, setToken, message, setMessage, isLoggedIn, setIsLoggedIn } =
    useContext(methodContext);

  const clickLogin = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    axios
      .post("http://localhost:5000/login/", {
        email: email,
        password: password,
      })
      .then((result) => {
        setToken(result.data.token);
        setIsLoggedIn(true);

        setMessage("loged in succefully");
        localStorage.setItem("token", result.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setIsLoggedIn(false);
        setMessage(error.response.data.message);
      });
  };
  //=============================================

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  });
  //=============================================

  return (
    <div className="login">
      
      <form>
      

      <input
       className="login__input"
        type="email"
        placeholder="Email "
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <input
        className="login__input"
        type="password"
        placeholder="Password "
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button className="login__button" onClick={clickLogin}>Login</button>
      <br />
      {message}

      </form>
      <button
      className="login__button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
};
