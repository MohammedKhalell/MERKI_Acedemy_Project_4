const productsModel = require("../models/products");

const getAllProducts = (req, res) => {
  productsModel
    .find()
    .populate("comments")
    .exec()
    .then((products) => {
      if (products.length) {
        res.status(200).json({
          success: true,
          message: `All the products`,
          products: products,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Products Yet`,
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

const getProductsByUser = (req, res) => {
  let userId = req.query.user;
  productsModel
    .find({ user: userId })
    .then((products) => {
      if (!products.length) {
        return res.status(404).json({
          success: false,
          message: `The user: ${userId} has no products`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the products for the user: ${userId}`,
        products: products,
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
const getProductsByCategory = (req, res) => {
  let categoryId = req.query.category;

  productsModel
    .findMany({ category: categoryId })
    .then((products) => {
      if (!products.length) {
        return res.status(404).json({
          success: false,
          message: `The category: ${categoryId} has no products`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the products for the category: ${categoryId}`,
        products: products,
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
const getProductById = (req, res) => {
  let id = req.params.id;
  productsModel
    .findById(id)
    .exec()
    .then((products) => {
      if (!products) {
        return res.status(404).json({
          success: false,
          message: `The products with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The products ${id} `,
        products: products,
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

const createNewProducts = (req, res) => {
  const { productName, description,images,price } = req.body;
  const newProducts = new productsModel({
    productName,
    description,
    images,
    price,
  });

  newProducts
    .save()
    .then((products) => {
      res.status(201).json({
        success: true,
        message: `Products created`,
        products: products,
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

const updateProductsById = (req, res) => {
  const id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key].toString().replaceAll(" ", "") == "" && delete filter[key];
  });
  productsModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((newProducts) => {
      if (!newProducts) {
        return res.status(404).json({
          success: false,
          message: `The products with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `products updated`,
        products: newProducts,
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

const deleteProductsById = (req, res) => {
  const id = req.params.id;
  productsModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The products with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `products deleted`,
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
  getAllProducts,
  getProductsByUser,
  getProductsByCategory,
  getProductById,
  createNewProducts,
  updateProductsById,
  deleteProductsById
};
