const express = require("express");

const {
  getAllProducts,
  getProductsByUser,
  getProductsByCategory,
  getProductById,
  createNewProducts,
  updateProductsById,
  deleteProductsById
  
} = require("../controllers/products");

const { createNewComment } = require("../controllers/comments");
const { AddToCard } = require("../controllers/card");
const { AddToOrder } = require("../controllers/order");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const productsRouter = express.Router();

productsRouter.get("/", authentication, getAllProducts);
productsRouter.get("/search_1", getProductsByUser);
productsRouter.get("/search_2/:id", getProductById);
productsRouter.get("/search_3/:category", getProductsByCategory);
productsRouter.post(
  "/",
  authentication,
  authorization("CREATE_Products"),
  createNewProducts
);
productsRouter.put("/:id", updateProductsById);
productsRouter.delete("/:id", deleteProductsById);

productsRouter.post(
  "/:id/comments",
  authentication,
  authorization("CREATE_COMMENTS"),
  createNewComment
);
productsRouter.put("/:id/card",authentication,AddToCard);
productsRouter.put("/order",authentication,AddToOrder);


module.exports = productsRouter;
