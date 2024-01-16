const express = require("express");

// Import products controllers
const {
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getProductByCategory,
  getProductsByTitle
} = require("../controllers/products");

// Import comments controller
const { createNewComment } = require("./../controllers/comments");

// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// Create products router
const productsRouter = express.Router();

productsRouter.post("/", authentication, createProduct);

productsRouter.get("/", authentication, getAllProducts);

productsRouter.put("/:id", authentication, updateProductById);

productsRouter.delete("/:id", authentication, deleteProductById);

productsRouter.post("/:id/comments", authentication, createNewComment);

productsRouter.get("/search_1", getProductByCategory);

productsRouter.get("/search_2", getProductsByTitle);

module.exports = productsRouter;
