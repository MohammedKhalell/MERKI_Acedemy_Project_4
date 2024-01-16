const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },

  subcategory: { type: String, required: true },
  manufacture: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  rate: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rate" }],
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Products", productsSchema);
