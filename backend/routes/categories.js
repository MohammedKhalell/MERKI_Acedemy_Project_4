const express = require("express");

// Import categories controllers
const {
  createCategory,
  getAllCategories,
} = require("../controllers/categories");

// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// Create categories router
const categoriesRouter = express.Router();

categoriesRouter.post("/",authentication ,createCategory);

categoriesRouter.get("/", getAllCategories);

module.exports = categoriesRouter;
