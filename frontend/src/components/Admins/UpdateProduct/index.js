import { React, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { appContext } from "../../../App";
import "./style.css";

//-------------------------------

const UpdateProduct = () => {
  //-------------------------------
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, allProducts, setAllProducts } = useContext(appContext);
  //-------------------------------

  const [img, setImg] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [ItemsCounter, setItemsCounter] = useState(0);
  const [message, setMessage] = useState("");

  //---------------------------------------update product by id

  const updateProductById = () => {
    axios
      .put(
        `http://localhost:5000/products/${id}`,
        {
          brand: newBrand,
          productName: newProductName,
          image: img,
          description: newDescription,
          price: newPrice,
          category: newCategory,
        },
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
        setMessage(err.response.data.message);
      });
  };

  return (
    <div className="update">
      <input
        className={"input-update"}
        onChange={(e) => {
          setNewBrand(e.target.value);
        }}
        type={"text"}
        placeholder={"Update the product brand"}
      ></input>
      <input
        className={"input-update"}
        onChange={(e) => {
          setNewProductName(e.target.value);
        }}
        type={"text"}
        placeholder={"Update the product name"}
      ></input>
      <input
        className={"input-update"}
        onChange={(e) => {
          setImg(e.target.value);
        }}
        type={"text"}
        placeholder={"Update the image url"}
      ></input>

      <textarea
        className={"input-update"}
        onChange={(e) => {
          setNewDescription(e.target.value);
        }}
        type={"text"}
        placeholder={"Update the product description"}
      ></textarea>

      <input
        className={"input-update"}
        onChange={(e) => {
          setNewPrice(e.target.value);
        }}
        type={"text"}
        placeholder={"Update the product price"}
      ></input>
      <input
        className={"input-update"}
        onChange={(e) => {
          setNewCategory(e.target.value);
        }}
        type={"text"}
        placeholder={"Update the product category"}
      ></input>

      <button className="button" onClick={updateProductById}>
        Update
      </button>
    </div>
  );
};

export default UpdateProduct;
