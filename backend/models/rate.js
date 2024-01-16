const mongoose = require("mongoose");
const rateSchema= new mongoose.Schema({
    rater:{type:mongoose.Schema.Types.ObjectId, ref:"Users"},
    rate:{type:Number}
})
module.exports=mongoose.model("Rate",rateSchema)