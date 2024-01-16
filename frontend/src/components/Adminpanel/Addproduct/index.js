import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"
const AddProduct=()=>{
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [imageUrl,setImageUrl]=useState("")
    const [price,SetPrice]=useState("")
    const [category,setCategory]=useState("")
    const [subcategory,setSubCategory]=useState("")
    const [manufacture,setManufacture]=useState("")
    const token=localStorage.getItem("token")
    const [message,setMessage]=useState("")
    const[state,setState]=useState(false)
    useEffect(()=>{
        console.log(category);
    },[state])
return(
    <div className="addproduct">
        <h1>{message}</h1>
        <input type={"text"} value={title} placeholder={"title"} onChange={(e)=>{ setTitle(e.target.value)
        setMessage("")
        }}/>
        <input type={"text"} value={description} placeholder={"description"} onChange={(e)=>{setDescription(e.target.value)}}/>
        <input type={"text"} value={imageUrl}placeholder={"imageUrl"} onChange={(e)=>{setImageUrl(e.target.value)}}/>
        <input type={"number"} value={price} placeholder={"price"} onChange={(e)=>{SetPrice(e.target.value)} }min={1}/>
        {/* <input type={"text"} value={category}placeholder={"category"} onChange={(e)=>{setCategory(e.target.value)}}/>
        <input type={"text"} value={subcategory}placeholder={"sub category"} onChange={(e)=>{setSubCategory(e.target.value)}}/>
        <input type={"text"} value={manufacture}placeholder={"manufacture"} onChange={(e)=>{setManufacture(e.target.value)}}/> */}
         <div className="select"><h1>Category:</h1><select name="list" id="list" onChange={(e)=>{setCategory(e.target.value)
        setState(!state)}}>
            <optgroup>
         <option value=""  >select category</option>
    <option value="hardware" >Hardware</option>
    <option value="pcLaptop">PcLaptop</option>
    <option value="gaming">Gaming</option>
    <option value="printerScanner">PrinterScanner</option>
    </optgroup>
  </select>
  </div>
  {category ==="hardware"?<div className="select"><h1>type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1><select name="list" id="list" onChange={(e)=>{setSubCategory(e.target.value)}}>
  
  <option value=""  >select type</option>

  <option value="cpu" >Processor</option>

<option value="gpu">Graphic Card</option>
<option value="motherboard">Motherboard</option>
<option value="ram">Memory-Ram</option>
<option value="case">Cases</option>
<option value="powersupply">Power supply</option>
<option value="ssd">SSD</option>

</select>
</div>:""

}



  
  
        <button onClick={()=>{
            axios.post("http://localhost:5000/products/addproduct",{
                title:title,
                description:description,
                imageUrl:imageUrl,
                price:price,
                subcategory:subcategory,
                category:category,
                manufacture:manufacture,
            },{headers:{ Authorization:`Bearer ${token}`}}).then((result)=>{setMessage("Product Added Successfully")
        }).catch((err)=>setMessage("Please Fill All Fields"))
            setTitle("")
            setDescription("")
            setImageUrl("")
            SetPrice("")
            /* setCategory("")
            setSubCategory("")
            setManufacture("") */
        }}>Add product</button>
        
    </div>
)
}
export default AddProduct