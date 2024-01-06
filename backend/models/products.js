const mongoose = require("mongoose");

const products = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String },
  images: [{ type: String}],
  price: { type: Number},
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Products", products);
