const roleModel = require("../models/roleSchema");
//----------------------------------
const addRole = (req, res) => {
  const { role, permissions } = req.body;
  const roleInstance = new roleModel({
    role,
    permissions,
  });
  roleInstance
    .save()
    .then((role) => {
      console.log(role);
      res.status(201).json({
        success: true,
        message: "Role created",
        role,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
//--------------------------------
module.exports = { addRole };
