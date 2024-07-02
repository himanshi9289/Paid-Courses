import User from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import Course from "../models/Course.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary"

// ------------------ Register User -----------------------------
export const registerUser = catchAsyncError(async(req,res,next) => {
    const {name,email,password} = req.body;
    
    if(!name || !email || !password) return next(new ErrorHandler("Please fill all the details",400));
    
    let user = await User.findOne({email});
    if(user) return next(new ErrorHandler("Please fill all the details",409));
    
    const file=req.file;
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    const genSalt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password,genSalt);

    user = await User.create({
        name,email,password:hashPassword,
        avatar:{
            public_id: myCloud.public_id,
            url:myCloud.secure_url
        }
    });
    sendToken(res,user,"User Registered Successfully",201);
});


// ------------------ Login User -----------------------------
export const loginUser = catchAsyncError(async(req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password) next(new ErrorHandler("Please Enter the details first to login.",400));

    const user = await User.findOne({email}).select("+password");
    if(!user) next(new ErrorHandler("Email and password are not valid.",401));

    const isMatch = bcrypt.compareSync(password,user.password);
    if(!isMatch) next(new ErrorHandler("Email and password are not valid.",401));

    sendToken(res,user,"Login User Successfully",200)
});


// ------------------ Logout User -----------------------------
export const logoutUser = catchAsyncError(async (req,res,next) => {
    res.cookie("token",null,{
        expires:new Date(Date.now())
    }).json({success: true,message:"Logged Out Succesffully"})
});

// ------------------ Get User Details -----------------------------
export const getUser = catchAsyncError(async (req,res) => {
    const {token} = req.cookies;
    if(!token) return res.status(401).json("User not Logged In");
    jwt.verify(token,process.env.JWT_TOKEN,{},async (err,data)=>{
        if(err) throw err;
        const {_id}=data;
        console.log(_id);
        const user = await User.findById(_id);
        return res.json({
            success:true,
            user
        })
    })
});

// ------------------ Change Password of User -----------------------------
export const changePassword = catchAsyncError(async (req,res,next)=>{
    const {oldPassword,newPassword} = req.body;
    if(!oldPassword || !newPassword) return next(new ErrorHandler("Please enter all Fields",400));

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = bcrypt.compareSync(oldPassword,user.password);
    if(!isMatch) return next(new ErrorHandler("Incorrect Password",400));

    const genSalt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newPassword,genSalt);

    user.password = hashPassword;
    await user.save();

    res.json({
        success:true,
        message:"Password Successfully Changed"
    })
});

// ------------------ Update Profile of logged in User -----------------------------
export const updateProfile = catchAsyncError(async (req,res,next)=>{
    const {name,email} = req.body;
    if(!name || !email) return next(new ErrorHandler("Please enter all Fields",400));

    let user = await User.findOne({email})
    if(user) return next(new ErrorHandler("Please enter another emailID",400));

    user = await User.findById(req.user._id);

    user.name=name;
    user.email=email;

    await user.save();

    res.json({
        success:true,
        message:"Profile Successfully Updated"
    })
});

// ------------------ Update Profile Picture of User -----------------------------
export const updateProfilePicture = catchAsyncError(async (req,res,next)=>{
    const file=req.file;

    const user = await User.findById(req.user._id);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    user.avatar.public_id=myCloud.public_id;
    user.avatar.url=myCloud.secure_url;

    await user.save();

    res.json({
        success:true,
        message:"Profile Picture Successfully Updated"
    })
});

// ------------------ Forgot Password  -----------------------------
export const forgotPassword = catchAsyncError(async (req,res,next)=>{
    
    const {email} = req.body;

    const user = await User.findOne({email});
    if(!user) return next(new ErrorHandler("User Not Found",400));

    const resetToken = await user.getResetToken();

    await user.save();

    const url =`${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
    const message = `Click on the given link to reset your password ${url}. If you didn't requested please ignore`

    await sendEmail(user.email,"Reset Password",url);

    res.json({
        success:true,
        message:`Reset Token sent on ${user.email}`,
    })
});

// ------------------ Reset password using token -----------------------------
export const resetPassword = catchAsyncError(async (req,res,next)=>{
    const {token} = req.params;

    if(!token) return next(new ErrorHandler("Not Authorized user ",401));

    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{
            $gt:Date.now(),
        }
    })

    if(!user) return next(new ErrorHandler("Token Exired or is invalid",401));

    const {password} = req.body;
    if(!password) return next(new ErrorHandler("Enter password first",400));

    const genSalt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password,genSalt);

    user.password = hashPassword;
    user.resetPasswordToken=undefined;
    await user.save();

    res.json({
        success:true,
        message:`Password Reset Successfully`,
    });
});


// ------------------ Add to Playlist -----------------------------
export const addToPlaylist = catchAsyncError(async (req,res,next) => {
    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.body.id);

    if(!course) return next(new ErrorHandler("Course Doesn't Exist",404));


    const isPlaylist = user.playlist.find(list=>list.course._id.toString()===course._id.toString());
    if(isPlaylist) return next(new ErrorHandler("Course Already Exist",400));

    user.playlist.push({
        course:course._id,
        poster:course.poster.url,
    });

    await user.save();

    res.json({
        success:true,
        message: "Course added to Playlist successfully.",
    });
});


// ------------------ Remove from Playlist -----------------------------
export const removeFromPlaylist = catchAsyncError(async (req,res,next) => {
    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.query.id);
    if(!course) return next(new ErrorHandler("Course Doesn't Exist",404));

    const isPlaylist = user.playlist.find(list=>list.course._id+""==course._id);
    if(!isPlaylist) return next(new ErrorHandler("Course doesn't exist in playlist",400));

    const newPlaylist = user.playlist.filter(list => list.course._id.toString()!==course._id.toString());
    user.playlist=newPlaylist;
    await user.save();

    res.json({
        success:true,
        message: "Playlist removed successfully.",
    });
});


// ------------------ Delete My Profile -----------------------------
export const deleteMyProfile = catchAsyncError(async (req,res,next)=> {

    const user = await User.findById(req.user._id);

    if(user.avatar.url){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }   
    await User.findByIdAndDelete(req.user._id);

    res.cookie("token",null,{
        expires:new Date(Date.now())
    }).json({
        success:true,
        message: "Profile Deleted Successfully.",
    })  
});


// ------------------ Admin Controller - Get All Users -----------------------------
export const getAllUsers = catchAsyncError(async (req,res,next)=>{
    const users = await User.find({});
    res.json({
        success:true,
        message: "List of users fetched successfully.",
        users
    });
}) ;

// ------------------ Admin Controller - Update Role -----------------------------
export const updateUserRole = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params;
    
    const user = await User.findById(id);
    if(!user) return next(new ErrorHandler("User Not Found",404));

    if(id.toString()===req.user._id.toString()) return next(new ErrorHandler("Can't change role",400));

    if(user.role === "user") user.role="admin";
    else user.role="user";

    await user.save();

    res.json({
        success:true,
        message: "Role Updated successfully.",
    })
});

// ------------------ Admin Controller - Delete User -----------------------------
export const deleteUser = catchAsyncError(async (req,res,next) => {
    const {id} = req.params;
    
    const user = await User.findById(id);
    if(!user) return next(new ErrorHandler("User Not Found",404));

    if(id.toString()===req.user._id.toString()) return next(new ErrorHandler("Current logged in User can't be deleted",400));

    if(user.avatar.url){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }

    await User.findByIdAndDelete(id);

    res.json({
        success:true,
        message: "User Deleted successfully.",
    })
});

