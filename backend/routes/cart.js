const express = require("express");
const {
  addCart,
  getAllCartItems,
  deleteItemFromCart,
  deleteAll,
} = require("../controllers/cart");
const { authentication } = require("../middleware/authentication");

const cartRouter = express.Router();

cartRouter.post("/", authentication, addCart);
cartRouter.get("/", authentication, getAllCartItems);
cartRouter.delete("/:id", authentication, deleteItemFromCart);
cartRouter.delete("/", authentication, deleteAll);

module.exports = cartRouter;
