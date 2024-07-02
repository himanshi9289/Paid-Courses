import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import crypto from "crypto"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name"]
    },
    email: {
        type:String, 
        required: [true, "Please enter the email"], 
        unique: [true,"Please enter another email"], 
        validate:validator.isEmail
    },
    password: {
        type: String,
        required: [true,"Please enter the password"],
        minLength: [7,"Please enter atleast 7 character in your password"],
        select: false  
    },
    role:{
        type: String, 
        enum:["admin","user"], 
        default:"user"
    },
    subscription: {
        id: String, 
        status: String
    },
    avatar: 
    {
        public_id: {
            type: String,
            required: true
        }, 
        url: {
            type: String,
            required: true
        }
    },
    playlist: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        poster: String
    }],
    createdAt: {
        type:Date, 
        default:Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: String
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_TOKEN,{
        expiresIn:"15d"
    });
}

userSchema.methods.getResetToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now()+15*60*100;
    return resetToken;
}

export default mongoose.model("User",userSchema);