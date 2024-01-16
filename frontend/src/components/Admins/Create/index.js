import { React, useContext, useState } from "react";
import axios from "axios";
import { appContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import "./style.css";
//---------------------------------

const CreateProduct = () => {
  const navigate = useNavigate();
  const { token, allProducts, setAllProducts } = useContext(appContext);
  //---------------------------------

  const [message, setMessage] = useState("");
  const [productName, setProductName] = useState("");
  const [img, setImg] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  //-------------------------------- create new Product

  const createNewProduct = () => {
    axios
      .post(
        "http://localhost:5000/products/",
        { brand, productName, image: img, description, price, category },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const updatedProduct = allProducts.filter((product) => {
          return product._id === product.id;
        });
        setAllProducts(updatedProduct);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data.err);
        setMessage(err.response.data.message);
      });
  };

  return (
    <div className="create">
      <input
        className={"input-create"}
        onChange={(e) => {
          setBrand(e.target.value);
        }}
        type={"text"}
        placeholder={"produckt brand"}
      ></input>

      <input
        className={"input-create"}
        onChange={(e) => {
          setProductName(e.target.value);
        }}
        type={"text"}
        placeholder={"produckt name"}
      ></input>

      <input
        className={"input-create"}
        onChange={(e) => {
          setImg(e.target.value);
        }}
        type={"text"}
        placeholder={"produckt image url"}
      ></input>

      <textarea
        className={"input-create"}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        type={"text"}
        placeholder={"description"}
      ></textarea>

      <input
        className={"input-create"}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        type={"text"}
        placeholder={"price"}
      ></input>
      <input
        className={"input-create"}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        type={"text"}
        placeholder={"produckt category"}
      ></input>

      <button className="button" onClick={createNewProduct}>
        Create
      </button>
    </div>
  );
};

export default CreateProduct;
