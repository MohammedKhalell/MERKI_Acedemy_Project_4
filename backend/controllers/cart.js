const cartModel = require("../models/cartSchema");
//------------------------------add cart
const addCart = async (req, res) => {
  try {
    const { productId, qnt } = req.body;
    const userId = req.token.userId;

    const found = await cartModel.findOne({ userId, productId });
    console.log(found);
    let cart;
    if (found) {
      cart = await cartModel.findOneAndUpdate(
        { userId, productId },
        { qnt },
        { new: true }
      );
      console.log(cart);
    } else {
      const cartInstance = new cartModel({
        userId,
        productId,
        qnt,
      });
      cart = await cartInstance.save();
    }

    res.status(201).json({
      success: true,
      message: `cart edited`,
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};
//--------------------------------- get all item in cart
const getAllCartItems = (req, res) => {
  const userId = req.token.userId;

  cartModel
    .find({})
    .populate("productId")
    .then((products) => {
      console.log(products);
      res.status(200).json({
        success: true,
        message: "All the cart products",
        products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deleteItemFromCart = (req, res) => {
  const productId = req.params.id;

  cartModel
    .findByIdAndDelete({ _id: productId })
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `The product isn't found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Product deleted form Cart`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err.message,
      });
    });
};

//----------------------------------delete all
const deleteAll = (req, res) => {
  cartModel
    .remove({})
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `The are no Products`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Buy successfully`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err.message,
      });
    });
};

module.exports = {
  addCart,
  getAllCartItems,
  deleteItemFromCart,
  deleteAll,
};
