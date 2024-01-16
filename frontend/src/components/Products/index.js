import React from "react";
import { useState, useContext, useEffect } from "react";
import { appContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
// import Pagination from "../Pagination";

//---------------------------

//---------------------------

const Products = () => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  //-----------------------------

  const {
    token,
    setAllProducts,
    allProducts,
    cartProducts,
    setProductsInCart,
  } = useContext(appContext);

  //--------------------------- get all products

  const getcurrentQty = () => {
    console.log("------", cartProducts);
    const currentQty = cartProducts.reduce((acc, item) => {
      acc[item.productId._id] = item.qnt;
      return acc;
    }, {});
    console.log("currentQty", currentQty);
    return currentQty;
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prePage = () => {
    setPage(page - 1);
  };

  const getAllProducts = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `http://localhost:5000/products/?p=${page}` /* ,
      {
        headers: { Authorization: `Bearer ${token}` },
      } */
    );
    const { products } = data;
    setAllProducts(products);
    setLoading(false);
  };

  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const handleClick = (productId) => {
    if (role === "admin") {
      navigate(`/product/${productId}`);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [page]);

  const productsQnt = (id, qnt) => {
    setProducts({ ...products, [id]: +qnt });
    console.log(Object.values(products));
  };

  const productInCart = Object.values(products);
  const num = productInCart.reduce((acc, product) => {
    acc = acc + product;
    return acc;
  }, 0);
  setProductsInCart(num);

  const addToCart = (id) => {
    console.log("products", products[id]);
    axios
      .post(
        "http://localhost:5000/cart/",
        { productId: id, qnt: products[id] },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div>
        <div className="content">
          {loading ? (
            <div>loading...</div>
          ) : (
            allProducts.map((product, i) => {
              return (
                <div
                  className="item"
                  onClick={() => handleClick(product._id)}
                  key={i}
                >
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
                  <div className="to_cart">
                    <input
                      className="count"
                      type="number"
                      min="0"
                      // value={product[product._id] || 0}
                      onChange={(e) => productsQnt(product._id, e.target.value)}
                    ></input>
                    <button
                      className="button-cart"
                      onClick={() => addToCart(product._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="next-back">
          {page > 0 && (
            <h4 onClick={prePage} className="back">
              {`<<`} Pre -----
            </h4>
          )}
          <h4 onClick={nextPage} className="back">
            ----- Next {`>>`}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Products;
