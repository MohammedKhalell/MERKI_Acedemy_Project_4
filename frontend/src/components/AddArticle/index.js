import React , {useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { othuser } from '../../App';


const  AddArticle =()=>{
const[title,setTitle]=useState("")
const [description, setDescription] = useState("");
const [stata, setStata] = useState(false); 
const [stata1, setStata1] = useState(false);
const {token}=useContext(othuser)

const Chickarticle =()=>{
    axios.post("http://localhost:5000/articles",{title,description },
    {headers:{authorization: "Bearer " + token}})
    .then((result)=>{
    if(result.data.success){
       setStata(true)
       setStata1(false)
    }else{
       setStata1("Error happened while creating new article, please try again")
       setStata(false)
    }  
    }).catch((error)=>{
        setStata1("you need to login first") 
    })
}
return (
    <>
    <div>
      
      <input type ="text" placeholder ="title here" onChange={(e)=>{
        setTitle(e.target.value)
      }}/>
      <textarea  placeholder="description here" onChange={(e)=>{
        setDescription(e.target.value)
      }}></textarea> 
      <button onClick={Chickarticle} >Create New Article</button>
    </div>
    <div>
        {stata?(<p >The article has been created successfully</p>):("")}
    </div>
    <div>
        {stata1?(<p >{stata1}</p>):("")}
    </div>

    </>
  );

}
export default AddArticle