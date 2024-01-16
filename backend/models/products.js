const mongoose = require("mongoose");

const products = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  img: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  wishLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "WishList" }],
});

module.exports = mongoose.model("Product", products);
