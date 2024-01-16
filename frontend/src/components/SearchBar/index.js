import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { loginStatusContext } from "../../App";
const Search = () => {
    const navigate=useNavigate()
  const [array, setArray] = useState();
  const { state, setState} = useContext(loginStatusContext);
  const [filter, setFilter] = useState();
  const [inputValue,setInputValue]=useState("")
  useEffect(() => {
    axios.get("http://localhost:5000/products/").then((result) => {
      setArray(result.data);
    });
  }, [state]);
  return (
    <div className="searchInput">
      <div className="search">
        <input value={inputValue}
          className="searchfield"
          placeholder="search"
          onChange={(e) => {
            setInputValue(e.target.value)
            setFilter(
              array.filter((element) => {
                if (e.target.value !== "")
                  return element.title.includes(e.target.value.toUpperCase());
              })
            );
          }}
        />
      </div>
      <div className="filter">
        {filter
          ? filter.map((element) => {
              return (
                <div>
                    <img onClick={()=>{
                   navigate(`/${element._id}`)
                   setState(!state)

                  }} className="searchimage" src={element.imageUrl}/>
                  <p onClick={()=>{
                    
                   navigate(`/${element._id}`)
                   setInputValue("")
                   setFilter("")
                   setState(!state)
                  }}>{element.title}</p>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};
export default Search;
