const express = require("express");

const { createNewCategorys } = require("../controllers/caregory");

const categoryRouter = express.Router();



categoryRouter.post("/", createNewCategorys);

module.exports = categoryRouter;
