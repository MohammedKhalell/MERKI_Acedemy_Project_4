const express = require("express");
const { wishList } = require("../controllers/wishList");

// Import products controllers
const {
  createWishList,
  getAllWishLists,
  deleteWishListById,
} = require("../controllers/wishList");

// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//define router
const wishListRouter = express.Router();

wishListRouter.post("/", authentication, createWishList);

wishListRouter.get("/", authentication, getAllWishLists);

wishListRouter.delete("/:id", authentication, deleteWishListById);

module.exports = wishListRouter;
