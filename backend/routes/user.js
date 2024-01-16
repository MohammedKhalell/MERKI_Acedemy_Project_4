const express = require("express");
const { register } = require("../controllers/register");
const { login } = require("../controllers/login");
const usersRouter = express.Router();
// --------------------------------------
usersRouter.post("/users", register);
usersRouter.post("/login", login);
// --------------------------------------
module.exports = usersRouter;
