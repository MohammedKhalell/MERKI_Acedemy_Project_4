import axios from 'axios';
import React , {useContext, useState} from 'react';
import {useNavigate } from "react-router-dom";
import { othuser } from '../../App';


const Login =()=>{
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
const {setToken}=useContext(othuser)

  const cheakLogin =()=>{
    axios.post(`http://localhost:5000/users/login` ,{email:email, password:password})
    .then((result)=>{

      if(result.data.success){
                console.log(result.data.token);
                localStorage.setItem("Token",result.data.token)
                setToken(result.data.token)
                navigate("/Dashboard") 
      }
    }).catch((error)=>{
      setLoginError(error);
    })

  }
return(
        <div>
             <div >
      
      <input type ="text" placeholder ="email here" onChange={(e)=>{
        setemail(e.target.value)
      }}/>
      <input type ="password" placeholder ="password here" onChange={(e)=>{
        setpassword(e.target.value)
      }}/>
      <button onClick={cheakLogin}>Login</button>
    </div>
    
    <div >{loginError ? navigate("/Dashboard") : "The email doesn't exist or the password you've entered is incorrect"}</div>
        </div>
    )
}
export default Login