import { useState, useContext, React } from "react";
import axios from "axios";
import { appContext } from "../../App";
import "./style.css";
import { useNavigate, Link } from "react-router-dom";

//-------------------------------

const Login = () => {
  const { token, setIsLogedIn, setToken } = useContext(appContext);

  //-------------------------------

  const navigate = useNavigate();
  //-----------------------------

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //-----------------------------

  const toLogin = () => {
    axios
      .post("http://localhost:5000/login/", { email, password })
      .then((res) => {
        console.log(res);
        setMessage(res.data.message);
        setIsLogedIn(true);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role.role);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  //------------------------------

  return (
    <div className="reg">
      Login:
      <input
        className="personal-info"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type={"text"}
        placeholder={"Your Email"}
      ></input>
      <input
        className="personal-info"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type={"password"}
        placeholder={"Your Password"}
      ></input>
      <button className="button" onClick={toLogin}>
        Login
      </button>
      <Link className="button" to={"/register"}>
        Register First
      </Link>
      <p className="message">{message}</p>
    </div>
  );
};
export default Login;
