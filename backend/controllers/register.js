const userModel = require("../models/userSchema");

// -------------------------------------

const register = (req, res) => {
  const { firstName, lastName, age, country, email, password, role } = req.body;

  const userInstance = new userModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    role,
  });

  userInstance
    .save()

    .then((result) => {
      if (result) {
        console.log(result);
        res.status(201);
        res.json({
          success: true,
          message: `Account Created Successfully`,
          user: result,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.keyValue) {
        res.status(409);
        res.json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500),
        res.json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
    });
};

module.exports = { register };
