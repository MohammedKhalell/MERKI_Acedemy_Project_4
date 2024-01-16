const categoriesModel = require("../models/categories");

//this function to create categories
const createCategory = (req, res) => {
  const { title,img } = req.body;

  const newCategory = new categoriesModel({ title, img });

  newCategory
    .save()
    .then((category) => {
      res.status(201).json({
        success: true,
        message: `Category created`,
        category: category,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getAllCategories = (req, res) => {
  categoriesModel
    .find({})
    .then((categories) => {
      if (categories.length) {
        res.status(200).json({
          success: true,
          message: `All the categories`,
          categories: categories,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Categories Yet`,
        });
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

module.exports = {
  createCategory,
  getAllCategories,
};
