import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import "./style.css"
import AddProduct from "./Addproduct";
import AllProducts from "./Allproducts";
const AdminPanel=()=>{
    const navigate=useNavigate()
    const [addIsClicked,setAddIsClicked]=useState(false)
    const [allIsClicked,setAllIsClicked]=useState(false)
    /* const [state,setState]=useState(false)
    const [isClicked,setIsClicked]=useState(true)
    useEffect(()=>{
        
    },[state]) */
    return(
        <div className="adminContainer">
        <div className="adminpanel">
        <button onClick={()=>{
           setAddIsClicked(true)
           setAllIsClicked(false)
        }}>Add products</button>
        <button onClick={()=>{
            setAddIsClicked(false)
            setAllIsClicked(true)
        }}>All products</button>

        </div>
        <div className="addproducts" style={ addIsClicked?{display:"block"}:{display:"none"}}><AddProduct /></div>
        <div className="allproducts" style={ allIsClicked?{display:"block"}:{display:"none"}}><AllProducts /></div>
        
        </div>
    )
}
export default AdminPanel
