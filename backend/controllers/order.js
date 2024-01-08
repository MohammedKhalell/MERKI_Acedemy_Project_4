const OrderModel = require("../models/order");
const CardModel = require("../models/card");

const AddToOrder = (req, res) => {

  CardModel.updateOne({user:req.token.userId},{$pull:{products}})
  .then((result) => {
    const newOrder = new OrderModel({result});
    newOrder
    .save()
       res.status(201).json({
     success: true,
     message: `Order added successfully`,
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

module.exports = { AddToOrder };
