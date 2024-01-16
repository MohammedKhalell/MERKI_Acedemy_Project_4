const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  userModel
    .findOne({ email })
    .populate("role")
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `The email doesn't exist`,
        });
      }

      try {
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: user._id,
          user: user.firstName,
          role: user.role,
          country: user.country,
        };
        const options = {
          expiresIn: "300m",
        };
        const token = await jwt.sign(payload, process.env.SECRET, options);
        console.log(token);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
          role: user.role,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })

    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = { login };
