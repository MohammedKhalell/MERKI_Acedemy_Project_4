const CardModel = require("../models/card");
const productsModel = require("../models/products");

const AddToCard = (req, res) => {
    const id = req.params.id;
    const newCard = new CardModel();
      newCard
    .save()
    .then(() => {
      productsModel
        .findById(id )
        .then((result) => {
            console.log(result);
          res.status(201).json({
            success: true,
            message: `product added`,
            products: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
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

module.exports = { AddToCard };
