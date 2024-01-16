const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  brand: { type: String },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Product", productSchema);
