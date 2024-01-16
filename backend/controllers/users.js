const req = require("express/lib/request");
const usersModel = require("../models/users");

///this function to create new user
const register = (req, res) => {
  console.log(req);
  const { firstName, lastName, age, country, email, password } = req.body;

  const user = new usersModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        user: result,
      });
    })
    //error handling
    .catch((error) => {
      //err.keyPattern => If error is a mongoose duplication key error
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  register,
};
