const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//this schema for user
const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    country: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wishList: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
    
  });
  
  //hash password before register
  userSchema.pre("save", async function () {
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password, 10);
  });

  //create model of user schema and export it
  module.exports = mongoose.model("User", userSchema);