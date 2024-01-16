const mongoose = require("mongoose");

const categories = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: false }
 
});

module.exports = mongoose.model("Category", categories);