import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import useParams
import { useParams ,Link} from "react-router-dom";
import "./GetProducts.css";
import { methodContext } from "../../App";

//============================================
export const Products = () => {
  const { token } = useContext(methodContext);

  const [products, setProducts] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [productId, setProductId] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");

  // {id} from useParams
  const { id } = useParams();

  const getProductsByCategory = async () => {
    console.log(id);
    try {
      // http://localhost:5000/products/search_1?category=627a6466b593400661bbfd18
      const result = await axios.get(
        `http://localhost:5000/products/search_1?category=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        setProducts(result.data.products);
        setMessage("");
      } else throw Error;
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  //===========================================
  const updateProduct = async (putProduct) => {
    // /products
    try {
      await axios.put(
        `http://localhost:5000/products/${putProduct}`,
        {
          title,
          description,
          price,
          // img,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getProductsByCategory();
    } catch (error) {
      console.log(error);
    }
  };
  //===========================================
  const updateClick = (product) => {
    //  if(products.userId === userId){

    setUpdateBox(!updateBox);
    setProductId(product._id);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    if (updateBox) updateProduct(product._id);
    // }
  };
  //===========================================
  const deleteProduct = async (delProdId) => {
    console.log(delProdId);
    try {
      await axios.delete(`http://localhost:5000/products/${delProdId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getProductsByCategory();
    } catch (error) {
      console.log(error);
    }
  };
  //===========================================
  const addComment = async (prodId) => {
    console.log(prodId);
    try {
      await axios.post(
        `http://localhost:5000/products/${prodId}/comments`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getProductsByCategory();
    } catch (error) {
      console.log(error.response);
    }
  };
  //===========================================

  //===========================================
  useEffect(() => {
    getProductsByCategory();
  }, []);
  //===========================================
  return (
    <>
    <div className="allProducts">
      <br />
      {products.length &&
        products.map((product, index) => (
          <div key={index} className="product">
            <div>Title : {product.title}</div>
            <br />
            <div>Description of product : {product.description}</div>
            <br />
            <div>Price : {product.price}</div>
            <div>
              {product.comments ? (
                product.comments.map((comment, i) => {
                  return (
                    <div className="deleteDiv">
                      <p className="comment" key={i}>
                        {comment.comment}
                      </p>
                      <button className="deleteCommentButton">X</button>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            {/* {product.userId === userId  && (
              <>
                {updateBox && productId === product._id && (
                  <form>
                    <br />
                    <input
                      type="text"
                      defaultValue={product.title}
                      placeholder="product title here"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />

                    <textarea
                      placeholder="product description here"
                      defaultValue={product.description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </form>
                )}
                
              </>
            )} */}
            <div>
              <textarea
                className="commentBox"
                placeholder="comment..."
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                className="commentBtn"
                onClick={() => {
                  addComment(product._id);
                }}
              >
                Add comment
              </button>
              {/* ==================================== */}
             
              {/* ==================================== */}
              {
                //   products.userId === userId
                <>
                  {
                    //   updateBox && productId === product._id &&
                    <form className="updateForm">
                      <br />
                      <input
                        className="input"
                        type="text"
                        defaultValue={product.title}
                        placeholder="product title here"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <br />

                      <textarea
                        className="description"
                        placeholder="product description here"
                        defaultValue={product.description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                      <br />
                      <input
                        className="input"
                        type="text"
                        defaultValue={product.price}
                        placeholder="product Price $$$"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <br />
                    </form>
                  }
                </>
              }
<div className="updateButtons" ></div>
<div className="updateButtonDiv"></div>
              <button className="update" onClick={() => updateClick(product)}>
                Update Product
              </button>
              <button
                className="update"
                onClick={() => deleteProduct(product._id)}
              >
                Delete Product
              </button>
            </div>
          </div>
        ))}
      {message && <div>{message}</div>}

      </div>
      <Link className="link" to="/Createproduct">
        Add Products 
      </Link>
    </>
  );
};
