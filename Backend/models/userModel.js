const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');



const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,"Please enter your name"],
    maxLength:[30,'Name can not exceed 30 char'],
    minLength:[4,"Name should have more than 5 char"]
},
email:{
    type:String,
    required:[true,"Please enter your email"],
    unique:true,
    validate:[validator.isEmail,"Please enter a valid email"]
},
password:{
    type:String,
    required:[true,"Enter your password"],
    minLength:[5,"Password should have more than 5 char"],
    select:false
},
avatar:{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
},
role:{
    type:String,
    default:"user"
},
createdAt: {
    type: Date,
    default: Date.now,
  },
resetPasswordToken : String,
resetPasswordExpire : Date
});


userSchema.pre('save',async function(){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
});



// JWT TOKEN
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });



    
}

//comparePassword
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };



  // Generating Password Reset Token
  userSchema.methods.getResetPasswordToken = function(){

  // Generating token
  const resetToken = crypto.randomBytes(20).toString("hex");


  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};


module.exports = mongoose.model("User",userSchema)