const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
   
    seat :[{
        type : String,
        
    }],
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",

    },
    movie:{
        type :String,
    },
    type :{
        type : String,
    },
    time :{
        type : String,
    },
    date :{
        type : Date,

    },
    amount:{
        type :Number
    },
    theatre :{
        type : String,
    },
    location:{
        type:String,
    },
    razorpayid : String,
    success:{
        type : Boolean,
        default : false,
    },
    created_at :{
        type :Date,
        default:Date.now()
    }




})
orderSchema.index({ date: 1 }, { expireAfterSeconds: 86400  });

module.exports = mongoose.model("Order", orderSchema)