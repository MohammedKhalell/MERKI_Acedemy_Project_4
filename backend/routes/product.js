const express = require("express");
const {
  addNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  search,
} = require("../controllers/product");
const { createNewComment } = require("../controllers/comment");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");
const productsRouter = express.Router();
//-------------------------------------

productsRouter.post(
  "/",
  authentication,
  authorization("CREATE_PRODUCT"),
  addNewProduct
);
productsRouter.get("/", getAllProducts);
productsRouter.get("/search_2", search);
productsRouter.get("/search_1", getProductById);
productsRouter.put(
  "/:id",
  authentication,
  authorization("CREATE_PRODUCT"),
  updateProductById
);
productsRouter.delete(
  "/:id",
  authentication,
  authorization("CREATE_PRODUCT"),
  deleteProductById
);
productsRouter.post(
  "/:productId/comments",
  authentication,
  authorization("CREATE_COMMENTS"),
  createNewComment
);

//-------------------------------------
module.exports = productsRouter;
