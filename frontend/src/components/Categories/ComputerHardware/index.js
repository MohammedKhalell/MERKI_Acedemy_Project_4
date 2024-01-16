import axios from "axios";
import React,{useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { loginStatusContext } from "../../../App";
import Home from "../../Home";
import "./style.css";
const Hardware= ()=>{
const {setPath,state,setState,setProducts,path,setCounter}=useContext(loginStatusContext)

    return(
        
        <div className="hardware">
            <h1>Hardware</h1>
        <div className="subCat"> 
        <div className="subs" onClick={()=>{
            setCounter(0)
            setPath("/category/hardware/cpu")
            setState(!state)
        }}>
            <img src="https://citycenter.jo/image/cachewebp/catalog/1-1-2019/gaming%20cpu-160x100.webp"/>
        <p >cpu</p>
        </div>
        <div className="subs" onClick={()=>{
                        setCounter(0)

            setPath("/category/hardware/gpu")
            setState(!state)
        }}>
            <img src="https://citycenter.jo/image/cachewebp/catalog/1-1-2019/gaming%20gpu-160x100.webp"/>
        <p>Graphic cards</p>
        </div  >
        <div className="subs"onClick={()=>{
                        setCounter(0)

            setPath("/category/hardware/motherboard")
            setState(!state)
        }}>
        <img src="https://citycenter.jo/image/cachewebp/catalog/1-1-2019/gaming%20motherboard-160x100.webp"/>
        <p>Motherboard</p>
        </div>
        <div className="subs" onClick={()=>{
            setCounter(0)
            setPath("/category/hardware/ram")
            setState(!state)
        }}>
        <img src="https://citycenter.jo/image/cachewebp/catalog/1-1-2019/gaming%20memory-160x100.webp"/>
        <p>Memory - RAM</p>
        </div>
        <div className="subs"onClick={()=>{
            setCounter(0)
            setPath("/category/hardware/case")
            setState(!state)
        }}>
        <img src="https://citycenter.jo/image/cachewebp/catalog/1-1-2019/gaming%20custom-160x100.webp"/>
        <p>Case & Chassis</p>
        </div>
        <div className="subs">
        <img src="https://citycenter.jo/image/cachewebp/catalog/1-1-2019/gaming%20power-160x100.webp"/>
        <p>Power Supply</p>
        </div>
        <div className="subs">
        <img src="https://citycenter.jo/image/cachewebp/catalog/category-images/gaming%20internal%20ssd-160x100.webp"/>
        <p>SSD ( Solid State Drive )</p>
        </div>
        </div>
        <div className="products">
           
    <Home/>
        </div>

        </div>
    )
}

export default Hardware