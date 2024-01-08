const CardModel = require("../models/card");

const AddToCard = (req, res) => {
    const id = req.params.id;
     CardModel.updateOne({user:req.token.userId},{$push:{products: id}})
     .then((result) => {
      res.status(201).json({
        success: true,
        message: `Product added successfully`,
        result: result,
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
