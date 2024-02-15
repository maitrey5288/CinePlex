const { instance } = require("../config/razorpay")
const Show = require("../models/Show")
const crypto = require("crypto")
const User = require("../models/User")
const Order = require("../models/Order")
const mailSender = require("../utils/mailSender")
 const mongoose = require('mongoose')
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const stripe = require("stripe")(process.env.STRIPE_SECRET)
 
// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  console.log(req.body)
  const { showId,seats} = req.body
  const userId = req.user.id
console.log(seats);
  if (seats.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0
 
  const showDetails = await Show.findById(showId);
 
  if(!showDetails){
    return res.status(401).json({
      success : false,
      message : "Show not found"
    })
  }
const current = new Date();
 
        const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
 

 let updated = new Map(showDetails.seats);
 console.log(seats)
  for (const seat of seats) {
  console.log(seat,showDetails.seats)
  const timeDifference = Math.abs( current.getTime() - showDetails.seats.get(seat).date.getTime());


    if(timeDifference >= fifteenMinutesInMilliseconds  && showDetails.seats.get(seat).status!='booked' ){
    
      updated.set(seat,{status:"unbooked",date:current});
      if(seat[0]>='A' && seat[0]<='C'){
        total_amount += 200;
      }
      else if(seat[0]>='D' && seat[0]<='H'){
        total_amount += 250
      }
      else{
        total_amount += 280
      }
    }
    else{
      console.log("ha error")
      console.log(showDetails.seats[seat])
      return res.status(401).json({
        success : false,
        message : "Some of the seats have been bookedwewq"
      })
    }



  
  }
    try {
      console.log(showDetails.seats);
     
   
//  showDetails.set(seat, 'locked')

     
  

// console.log(receipt)
    const options = {
      amount: total_amount * 100,
      currency: "INR",
      receipt: "receipt1",
     
    }
 
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    
    
    
    const showDetails1 = await Show.findOneAndUpdate({_id:showId,seats:showDetails.seats},
      { $set : {"seats" : updated}},
      { new: true },
      ).populate("movie").populate({path:"theatre",populate : {path:"location"}});
      if(!showDetails1){
        console.log(showDetails1,"Dsfdsf")
        
              return res.status(401).json({
                success : false,
                message : "Some of the seats have been booked"
              })
            }
      console.log("location ger ite ",showDetails1.theatre.location)
      const OrderDetails= await Order.create({location:showDetails1.theatre.location,
                                              amount:total_amount ,
                                              seat:seats,
                                              time:  showDetails1.time,
                                              date:showDetails1.date,
                                              user : userId,
                                              razorpayid : paymentResponse.id,
                                              theatre:showDetails1.theatre.name,
                                              movie:showDetails1.movie.name,
                                              type:showDetails1.type
                                              
                                            }) 
      
      res.json({
        success: true,
        data: paymentResponse,
      })
     } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    const OrderDetails = await Order.findOneAndUpdate({razorpayid:razorpay_order_id},{success:true},{new:true}).populate("user") 
    
    await mailSender(
      OrderDetails.user.email,
      "Verify Email",
      `Your seats <h1>${OrderDetails.seat.toString()}</h1> for show <h1>${OrderDetails.show}</h1> for movie <h1>${OrderDetails.movie }</h1>`
    );

    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

exports.getBooking = async (req, res) => {
 
  try {
    const userId = req.user.id;

    
    const Bookings =await Order.find({user:userId}) 

console.log("g",Bookings)
    return res.status(200).json({ success: true, message: "booking Details" ,data:Bookings})
    
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed" })
  }

  
}

