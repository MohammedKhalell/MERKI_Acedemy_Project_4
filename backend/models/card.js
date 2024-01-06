const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],

});

module.exports = mongoose.model("Card", cardSchema);
