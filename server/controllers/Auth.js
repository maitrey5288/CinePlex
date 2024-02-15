const bcrypt = require("bcryptjs")
const User = require("../models/User")
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
 
const mailSender = require("../utils/mailSender")
const { passwordUpdated } = require("../mail/templates/passwordUpdate")
 
require("dotenv").config()

// Signup Controller for Registering USers

exports.signup = async (req, res) => {
  try {
    // Destructure fields from the request body
    const {firstName,lastName,email,password,confirmPassword } = req.body.formData
    // Check if All Details are there or not
    console.log( firstName,lastName,email,password,confirmPassword,"body",req.body)
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword  
      
    ) {
      console.log( firstName,lastName,email,password,confirmPassword,"body")
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      })
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      })
    }

   

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

   
   
    
 
      
  
       
  
    const token = crypto.randomBytes(32).toString('hex');

      const url = `${process.env.FRONTEND}/${token}`;
  
      await mailSender(
        email,
        "Verify Email",
        `Your Link for email verification is ${url}. Please click this url to reset your password.`
      );
  
       


      const user = await User.create({
        firstName,
        lastName,
        email,
        verifyToken : token,
        accountType : "User",
        password: hashedPassword, 
        
        image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}%20${lastName}`,
      })
      
    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    })
  }
}

// Login controller for authenticating users
exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body.formData

    // Check if email or password is missing
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      })
    }

    // Find user with provided email
    let user = await User.findOne({ email })

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      })
    }
    if (!(user.verified)) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `Email id is not verified`,
      })
    }
     
    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      )

                                                                                                                                
      user.token = token
      user.password = undefined
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      user.verifyToken = undefined
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      })
    }
  } catch (error) {
    console.error(error)
    // Return 500 Internal Server Error status code with error message
    return res.status(400).json({
      success: false,
      message: `Login Failure Please Try Again`,
    })
  }
}
 
// Controller for Changing Password
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id)

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}





exports.verifyAccount = async(req,res) => {

try {
  
  const {verifytoken} = req.body;
//  console.log(token);

 
  const userDetails = await User.findOneAndUpdate({verifyToken:verifytoken},{verified:true});

  if (!userDetails) {
    console.log('Document not found');
    return res.status(401).json({
      success: false,
      message: "token invalid or has expired" ,
      
    })
  }

   return res.status(200).json({
    success :true,
    message : "account verified"
   })
 



} catch (error) {
  console.error("Error occurred while updating password:", error)
  return res.status(500).json({
    success: false,
    message: "Error occurred while verifying",
    error: error.message,
  })
}

}


exports.getUserData = async(req,res) => {

  try{
    const userId = req.user.id;

    const userDetails = await User.findById(userId);

    return res.status(200).json({
        success : true,
        user : userDetails,
    })
  }
  catch(error){
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }

}