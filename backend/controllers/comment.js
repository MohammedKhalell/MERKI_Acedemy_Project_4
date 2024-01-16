const commentModel = require("../models/commentSchema");
const productModel = require("../models/productSchema");
//-------------------------------- create new comment
const createNewComment = (req, res) => {
  const productId = req.params.id;
  const { comment } = req.body;
  const commenter = req.token.userId;
  const commentInstance = new commentModel({
    comment,
    commenter,
  });
  commentInstance
    .save()
    .then((comment) => {
      productModel
        .updateOne({ _id: productId }, { $push: { comments: comment._id } })
        .then(() => {
          console.log(comment);
          res.status(201).json({
            success: true,
            message: `Commet added`,
            comment,
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
        message: `Server error`,
        err: err.message,
      });
    });
};
//--------------------------------
module.exports = {
  createNewComment,
};
