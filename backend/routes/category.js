const express = require("express");
const { createNewCategory } = require("../controllers/category");
const categorysRouter = express.Router();
//-------------------------
categorysRouter.post("/", createNewCategory);
//-------------------------
module.exports = categorysRouter;
