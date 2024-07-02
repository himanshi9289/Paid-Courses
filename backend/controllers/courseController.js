import Course from "../models/Course.js"
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

// ------------------  Get all Course -----------------------------
export const getAllCourses = catchAsyncError(async (req,res,next) => {
    const courses = await Course.find().select("-lectures");
    res.status(200).json({
        success: true,    
        courses
    });
});

// ------------------  Create Course -----------------------------
export const createCourse = catchAsyncError(async (req,res,next) => {
    const {title, description,category,createdBy} = req.body;
    if(!title || !description || !category || !createdBy) return next(new ErrorHandler("Please enter all fields",400))
    
    const file=req.file;
    const fileUri = getDataUri(file);

    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content)

    const course = await Course.create({
        title, description, category, createdBy, poster: {
            public_id: myCloud.public_id,
            url:myCloud.secure_url
        },
    });
    res.status(201).json({
        success: true,    
        message: "Course Created SuccessFully. Now you can add lectures ",
        course
    });
});

// ------------------  Add Lecture  -----------------------------
export const addLecture = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params;
    
    const course = await Course.findById(id);
    if(!course) return next(new ErrorHandler("Course Doesn't Exists",404));
    
    const {title, description} = req.body;
    const file=req.file;
    
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content,{
        resource_type: "video",
    })

    course.lectures.push({
        title,
        description,
        videos:{
            public_id: myCloud.public_id,
            url:myCloud.secure_url
        }
    });

    course.numOfVideos+=course.lectures.length;

    await course.save()

    res.json({
        success:true,
        message:"Lecture added to Course"
    })
});


// ------------------  Delete Course  -----------------------------
export const deleteCourse = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params;

    const course = await Course.findById(id);
    if(!course) return next(new ErrorHandler("Course Doesn't Exists",404));

    await cloudinary.v2.uploader.destroy(course.poster.public_id);
    for (let i = 0; i < course.lectures.length; i++) {
        const singleLecture=course.lectures[i];
        await cloudinary.v2.uploader.destroy(singleLecture.videos.public_id,{
            resource_type:"video", 
        });
    }

    await Course.findByIdAndDelete(id);

    res.json({
        success:true,
        message:"Course deleted."
    });
});


// ------------------  Get Course Details  -----------------------------
export const getCourseLectures = catchAsyncError(async (req,res,next)=>{
    const {id} = req.params;

    const course = await Course.findById(id);
    if(!course) return next(new ErrorHandler("Course Doesn't Exists",404));

    course.views+=1;
    await course.save();

    res.json({
        success:true,
        lectures: course.lectures
    })
});


// ------------------  Delete Lecture  -----------------------------
export const deleteLecture = catchAsyncError(async (req,res,next)=>{
    const {courseId, lectureId} = req.query;

    const course = await Course.findById(courseId);
    if(!course) return next(new ErrorHandler("Course Doesn't Exists",404));

    const lecture = course.lectures.find(item=>{
        if(item._id.toString()===lectureId.toString()) return item
    });

    await cloudinary.v2.uploader.destroy(lecture.videos.public_id, {
        resource_type: "video",
    });

    course.lectures = course.lectures.filter((item) => {
    if (item._id.toString() !== lectureId.toString()) return item; });

    course.numOfVideos = course.lectures.length;

    await course.save();

    res.json({
        success:true,
        message:"Course lecture deleted."
    })
});