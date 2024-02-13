const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{

    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401))
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id);


    next();



});

 exports.authorizeRoles = (...role) => {
    return (req, res, next) => {
      if (!role.includes(req.body.user)) {
        return next(
          new ErrorHandler(
            `Role: ${req.body.user} is not allowed to access this resource `,
            403
          )
        );
      }
  
      next();
    };
  };


