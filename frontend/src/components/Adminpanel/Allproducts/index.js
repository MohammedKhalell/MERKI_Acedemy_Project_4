import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { loginStatusContext } from "../../../App";
import "./style.css";

const AllProducts = () => {
  const [products, setProducts] = useState();
  const [state, setState] = useState(false);
  const { token } = useContext(loginStatusContext);
  const [updateClick, setUpdateClick] = useState(false);
  const [id, SetId] = useState("");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [price, SetPrice] = useState();
  const [category, setCategory] = useState();
  const [subcategory, setSubCategory] = useState();
  const [manufacture, setManufacture] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => setProducts(result.data));
  }, [state]);
  const updateProduct = (id) => {
    axios
      .put(
        `http://localhost:5000/products/update/${id}`,
        {
          title: title,
          description: description,
          imageUrl: imageUrl,
          price: price,
          category: category,
          subcategory: subcategory,
          manufacture: manufacture,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setUpdateClick(!updateClick);
        setState(!state);
      });
  };

  const handelUpdateChange = (productId) => {
    SetId(productId);
    setUpdateClick(!updateClick);

    
  };
  return (
    <div>
      {products
        ? products.map((element, index) => {
            return (
              <div className="all">
                <img src={element.imageUrl} width={"10%"} />
                <p>{element.title}</p>
                <p>{element.price}JOD</p>
                {id == element._id ? (
                  <div
                    className="update"
                    style={
                      updateClick ? { display: "flex" } : { display: "none" }
                    }
                  >
                    <input type={"text"} placeholder="title"  onChange={(e)=>{
                       
                        
                        setTitle(e.target.value)}} />
                    <input type={"text"} placeholder="description" onChange={(e)=>{setDescription(e.target.value)}} />
                    <input type={"text"} placeholder="imageUrl"onChange={(e)=>{setImageUrl(e.target.value)}} />
                    <input type={"number"} placeholder="price" defaultValue={1} min={1} onChange={(e)=>{SetPrice(e.target.value)}} />
                    <input type={"text"} placeholder="category" onChange={(e)=>{setCategory(e.target.value)}} />
                    <input type={"text"} placeholder="subcategory" onChange={(e)=>{setSubCategory(e.target.value)}} />
                    <input type={"text"} placeholder="manufacture" onChange={(e)=>{setManufacture(e.target.value)}} />
                    <button onClick={()=>{updateProduct(element._id)
                    setUpdateClick(!updateClick)
                    }}>save</button>
                  </div>
                ) : (
                  ""
                )}
                <div className="buttons1">
                <button
                  onClick={() => {
                    axios
                      .delete(
                        `http://localhost:5000/products/delete/${element._id}`,
                        {
                          headers: { Authorization: `Bearer ${token}` },
                        }
                      )
                      .then((result) => {
                        setState(!state);
                      });
                  }}
                >
                  delete
                </button>
                <button
                  onClick={(e) => {
                    handelUpdateChange(element._id);
                  }}
                >
                  Update
                </button>
              </div></div>
            );
          })
        : ""}
    </div>
  );
};
export default AllProducts;
