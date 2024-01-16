const categoryModel = require("../models/categorySchema");

//------------------------------create new category
const createNewCategory = (req, res) => {
  const { category } = req.body;
  const categoryInstance = new categoryModel({ category });
  categoryInstance
    .save()
    .then((category) => {
      res.status(200).json({
        success: true,
        message: "Category is created",
        category,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
module.exports = { createNewCategory };
