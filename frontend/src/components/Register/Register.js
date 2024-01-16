import React, {useState, useContext } from 'react'
 import  "./Register.css"
import axios from "axios";

import { Link,useNavigate } from "react-router-dom";

import { methodContext } from "../../App";

export const Register = () => {
  const navigate = useNavigate();

  const {message, setMessage, isLoggedIn} = useContext(methodContext);

  const [status, setStatus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickRegister = async(e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
try{
    const result = await axios.post("http://localhost:5000/users/", {
        firstName, lastName, age, country,
        email,
        password,
      });
      if(result.data.success){
        setStatus(true);
        setMessage("The user has been created successfully");
        navigate("/Login")
      }else throw Error;
    } catch(error) {
      setStatus(false);
        setMessage(error.response.data.message);
      };
      setMessage("Error happened while register, please try again");
  };
  //================================================
  return (
    <>
    <div className="Form">
      {!isLoggedIn ? (
        <>
          <p className="Title">Register:</p>
          <form onSubmit={clickRegister}>
            <br />
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <input
              type="number"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button>Register</button>
            <br />
          </form>
          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
        </>
      ) : (
        <p>Logout First</p>
      )}
    </div>
  </>
);
};
  

// export default Register;