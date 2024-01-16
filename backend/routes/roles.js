const express = require("express");
const { addRole } = require("../controllers/role");
const rolesRouter = express.Router();
//---------------------------------

rolesRouter.post("/", addRole);

//---------------------------------
module.exports = rolesRouter;
