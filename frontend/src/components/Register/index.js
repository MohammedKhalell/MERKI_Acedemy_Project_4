import "./style.css";

import axios from "axios";
import React from "react";
import { useState } from "react";
//-----------------------------------------

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "6331a7286b100154eb282d18";
  const [message, setMessage] = useState("");

  //------------------------------------------
  const createUser = () => {
    axios
      .post("http://localhost:5000/users/", {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
        role,
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  //------------------------------------------

  return (
    <div className={"reg"}>
      Register:
      <input
        className="personal-info"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        type={"text"}
        placeholder={"First Name"}
      ></input>
      <input
        className="personal-info"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        type={"text"}
        placeholder={"Last Name"}
      ></input>
      <input
        className="personal-info"
        onChange={(e) => {
          setAge(e.target.value);
        }}
        type={"number"}
        placeholder={"Age"}
      ></input>
      <input
        className="personal-info"
        onChange={(e) => {
          setCountry(e.target.value);
        }}
        type={"text"}
        placeholder={"Country"}
      ></input>
      <input
        className="personal-info"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type={"text"}
        placeholder={"Email"}
      ></input>
      <input
        className="personal-info"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type={"text"}
        placeholder={"Password"}
      ></input>
      <button className="button" onClick={createUser}>
        Register
      </button>
      <p className="message">{message}</p>
    </div>
  );
};
export default Register;
