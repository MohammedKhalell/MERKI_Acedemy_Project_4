const categorysModel = require("../models/category");

const createNewCategorys = (req, res) => {
  const { category } = req.body;
  const newCategorys = new categorysModel({
    category
  });
  newCategorys
  .save()
  .then((category) => {
    res.status(201).json({
      success: true,
      message: `category created`,
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

module.exports = {
    createNewCategorys,
};
