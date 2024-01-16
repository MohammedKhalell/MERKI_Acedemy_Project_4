import axios from "axios";
import { React, useContext, useEffect } from "react";
import { appContext } from "../../App";
import "./style.css";

//--------------------------

const Cart = () => {
  const { token, setCartProducts, cartProducts } = useContext(appContext);

  //--------------------------

  //--------------------------
  const getAllItems = () => {
    axios
      .get("http://localhost:5000/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCartProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const deleteCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const nonDeletedCart = cartProducts.filter((item) => {
        return item._id !== id;
      });
      setCartProducts(nonDeletedCart);
    } catch (error) {
      console.log(error);
    }
  };
  const totalPrice = () => {
    const total = cartProducts.reduce((acc, item) => {
      acc += item.qnt * item.productId.price;
      return acc;
    }, 0);
    return total;
  };

  const deleteAll = async () => {
    try {
      await axios.delete(`http://localhost:5000/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const buy = () => {
    deleteAll();
    getAllItems();
  };
  useEffect(() => {}, [buy]);

  return (
    <div className="main">
      {cartProducts?.map((item, i) => {
        return (
          <div key={i} className="items">
            <h2 className="brand">{item.productId.brand}</h2>
            <h3 className="product-name">{item.productId.productName}</h3>
            <img
              className="product-img"
              src={item.productId.image}
              alt={item.productId.productName}
            ></img>
            <div>
              <p>{item.productId.description}</p>
              <p>Qty:{item.qnt}</p>
              <p>{item.productId.price}$</p>

              <button
                className="button-delete1"
                onClick={() => deleteCart(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      <div className="total-buy">
        <div>
          {cartProducts.length > 0 && (
            <h3 className="total">total {totalPrice()}$</h3>
          )}
        </div>
        <div>
          {cartProducts.length > 0 && (
            <button className="button-delete1" onClick={buy}>
              Buy
            </button>
          )}
          {cartProducts.length <= 0 && (
            <h2 className="buy-message">
              Thank you for shopping with us! You will receive your products in
              three days
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
