const mongoose = require("mongoose");
const { db } = require("./users");
const cartSchema = new mongoose.Schema({
    
    product:{type:mongoose.Schema.Types.ObjectId, ref:"Products" , required:true},
    quantity:{type:Number ,default:1},
  total:{type:Number , default:1}
  
})

module.exports=mongoose.model("Cart",cartSchema)