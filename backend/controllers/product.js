const productModel = require("../models/productSchema");
//----------------------------------- add new product
const addNewProduct = (req, res) => {
  const { productName, brand, image, description, price, comments, category } =
    req.body;
  const userId = req.token.userId;

  const productInstance = new productModel({
    productName,
    brand,
    image,
    description,
    price,
    comments,
    category,
    userId,
  });
  productInstance
    .save()
    .then((product) => {
      res.status(201).json({
        success: true,
        message: `Product edited`,
        product,
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
//--------------------------------- get all products
const getAllProducts = (req, res) => {
  //   const userId = req.token.userId;
  const page = req.query.p || 0;
  const productPerPage = 9;

  productModel
    .find({})
    .skip(page * productPerPage)
    .limit(productPerPage)
    .exec()
    .then((products) => {
      console.log(products);
      res.status(200).json({
        success: true,
        message: "All the products",
        // userId: userId,
        products,
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

//--------------------------------------- regex
const search = (req, res) => {
  const regex = new RegExp(req.query.productName, "gi");
  console.log(regex);
  productModel
    .find({ productName: { $regex: regex } })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `This is the product`,
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err.message,
      });
    });
};

//---------------------------------- get product by Id
const getProductById = (req, res) => {
  let _id = req.query.id;
  productModel
    .find({ _id })
    .populate("comments")
    .exec()
    .then((product) => {
      if (!product) {
        res.status(404).json({
          success: false,
          message: `The product isn't found`,
        });
      }
      res.status(200).json({
        success: true,
        product,
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
//------------------------------------------udpate product by id
const updateProductById = (req, res) => {
  const _id = req.params.id;
  //   console.log(_id);
  const filter = req.body;
  // console.log(Object.keys(filter));
  Object.keys(filter).forEach((key) => {
    filter[key] == "" && delete filter[key];
  });
  productModel
    .findOneAndUpdate({ _id }, req.body, { new: true })
    .then((product) => {
      if (!product) {
        res.status(404).json({
          success: false,
          message: `The product: ${_id} isn't found`,
        });
      }
      // console.log('product:', product)
      res.status(201).json({
        success: true,
        message: `Product updated`,
        product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err.message,
      });
    });
};

//--------------------------------------- delete product by id

const deleteProductById = (req, res) => {
  const _id = req.params.id;
  productModel
    .findByIdAndDelete(_id)
    .then((product) => {
      if (!product) {
        res.status(404).json({
          success: false,
          message: `The product isn't found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Product deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err.message,
      });
    });
};

module.exports = {
  addNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  search,
};
