const express = require("express");
const { register } = require("../controllers/users");

//define router
const usersRouter = express.Router();

usersRouter.post("/", register);

module.exports = usersRouter;
