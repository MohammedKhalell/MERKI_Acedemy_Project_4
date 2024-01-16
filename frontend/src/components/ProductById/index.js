import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { appContext } from "../../App";
import "./style.css";

//--------------------------------

const ProductById = () => {
  //--------------------------------
  const navigate = useNavigate();
  const { id } = useParams();
  //console.log(id);

  //-------------------------------

  const [product, setProduct] = useState({});
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  //--------------------------------

  const { token, allProducts, setAllProducts } = useContext(appContext);

  //--------------------------------

  const getProductById = () => {
    axios
      .get(`http://localhost:5000/products/search_1?id=${id}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data.product[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addComment = () => {
    axios
      .post(
        `http://localhost:5000/products/${id}/comments`,
        { comment },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(allProducts);

        const updatedProduct = allProducts.filter((product) => {
          return product._id === product.id;
        });
        setAllProducts(updatedProduct);
        navigate(`/product/${id}`);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const deleteProductById = () => {
    axios
      .delete(`http://localhost:5000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res);
        const nondeletedProduct = allProducts.filter((product) => {
          return product._id !== id;
        });
        setAllProducts(nondeletedProduct);
        navigate("/home");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  //--------------------------------add to cart

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <div className="main-id">
      <div className="item-by-id">
        <h2 className="brand">{product.brand}</h2>
        <h3 className="product-name">{product.productName}</h3>
        <img
          className="product-img"
          src={product.image}
          alt={product.productName}
        ></img>
        <div className="price-desc">
          <p>{product.description}</p>
          <p>{product.price}$</p>
        </div>
      </div>
      <p>{product.comments && product.comments.comment}</p>
      <div className="inputs-buttons">
        <div className="all-buttons">
          <div className="comments">
            <input
              className="input-comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              type={"text"}
              placeholder={"Write Your Comment..."}
            ></input>
            <button className="button-by-id" onClick={addComment}>
              Add Comment
            </button>
          </div>
          <div className="update-create-delete">
            <button
              className="button-by-id"
              onClick={() => navigate(`/update/${id}`)}
            >
              Update
            </button>
            <button className="button-by-id" onClick={deleteProductById}>
              Delete
            </button>
            <button
              className="button-by-id"
              onClick={() => navigate(`/create`)}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductById;
