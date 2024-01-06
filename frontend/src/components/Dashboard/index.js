import axios from 'axios';
import React , {useState,useEffect,useContext} from 'react';
import { othuser } from '../../App';

const Dashboard = ()=>{
 const [articles,setarticles]=useState([])
 const {token}=useContext(othuser)
 const getArticle = ()=>{
    if (token){
    axios.get("http://localhost:5000/articles",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((result)=>{
        setarticles(result.data)
        console.log(result)
        
    }).catch((err)=>{
        console.log(err)
    })
}}
console.log(token);
    return (
        <div >
        <p>Dashboard</p>
        <button onClick={getArticle}>Get All Articles</button>
        
        {articles.map((elem,i)=>{
                return(<div >
                
                    <h1 >{elem.title}<button >More Details</button></h1>
                    <p >{elem.description}</p>
                </div>)
            })}
    </div>
    )
}
export default Dashboard