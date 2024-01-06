const OrderModel = require("../models/order");

const AddToOrder = (req, res) => {
    const newCard = new OrderModel(
      req.productName,
      req.description,
      req.images,
      req.price,
    );
  
    newCard
      .save()
      .then((product) => {
        res.status(201).json({
          success: true,
          message: `Product Added to card`,
          product: product,
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

module.exports = { AddToOrder };
