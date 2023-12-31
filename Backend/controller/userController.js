const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto');
const catchAsyncError = require("../middleware/catchAsyncError");


// Register a user
exports.registerUser = catchAsyncError(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profileUrl"
        }
    });
    sendToken(user,201,res)
})


// Login User

exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;

    // Checking if user has given email and password both\
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400));
    }
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }

   sendToken(user,200,res);
});


// Logout Method
exports.logout = catchAsyncError(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })


    res.status(200).json({
        success:true,
        message:"Logged out"
    })
});



// Forget Password

exports.forgotPassword = catchAsyncError(async(req,res,next)=>{


    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }


    // Get resetpassword token
    const resetToken = user.getResetPasswordToken();
    

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nif you have not requested this email than please ignore it`;

    try {

        await sendEmail({

            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        });
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500));
    }

});






// Reset password
exports.resetPassword = catchAsyncError(async(req,res,next) =>{

    // Creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });
    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;


  await  user.save();

  sendToken(user,200,res)

});



// get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne(req.body.id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });




  // Update user password
  exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne(req.body.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
  });
  



  // Update user Profile
  exports.updateProfile = catchAsyncError(async (req, res, next) => {
    
    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }

    // We will add cloudinary later

    const user = await User.findOneAndUpdate(req.body.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    
    res.status(200).json({
        success:true,
    })
  });



  // Get all users  -- Admin
  exports.getAllUser = catchAsyncError(async(req,res,next)=>{

        const users = await User.find();


        res.status(200).json({
            success:true,
            users
        })

  });

  


  // Get Single user  -- Admin
  exports.getSingleUser = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exists with id: ${req.params.id}`))
    }


    res.status(200).json({
        success:true,
        user
    })

});


  // Update user Role  --ADMIN
  exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }


    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    
    res.status(200).json({
        success:true,
    })
  });



    // Delete user --ADMIN
    exports.deleteUser = catchAsyncError(async (req, res, next) => {

        const user = await User.findById(req.params.id);


    
        // We will remove cloudinary later
        if(!user){
            return next(new ErrorHandler(`User does not exists with id: ${req.params.id}`))
        }

        await user.deleteOne();
       
        
        res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })
      });
    


    
    

