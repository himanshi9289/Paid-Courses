import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import Stats from "../models/Stats.js";

export const contact = catchAsyncError(async (req,res,next)=>{

    const {name,email,message} = req.body;

    if(!name || !email || !message) return next(new ErrorHandler("Please fill all the fields first.",400));
    
    const to = process.env.MY_MAIL;
    const subject = "Contact from CourseBundler";
    const text = `Name : ${name} and Email: ${email}. \n${message}.`

    await sendEmail(to,subject,text);

    res.json({
        success: true,
        message: "Your message has been sent."
    })
});

export const courseRequest = catchAsyncError(async (req,res,next)=>{
    
    const {name,email,courseName} = req.body;

    if(!name || !email || !courseName) return next(new ErrorHandler("Please fill all the fields first.",400));

    const to = process.env.MY_MAIL;
    const subject = "Requesting for a course on CourseBundler";
    const text = `Name : ${name} and Email is ${email}. \n${courseName}.`

    await sendEmail(to,subject,text);

    res.json({
        success: true,
        message: "Request has been sent to admin."
    })
});

export const getDashboardStats = catchAsyncError(async (req,res,next)=>{
    
    const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

    const statsData = [];
  
    for (let i = 0; i < stats.length; i++) {
      statsData.unshift(stats[i]);
    }
    const requiredSize = 12 - stats.length;
  
    for (let i = 0; i < requiredSize; i++) {
      statsData.unshift({
        users: 0,
        subscription: 0,
        views: 0,
      });
    }
  
    const usersCount = statsData[11].users;
    const subscriptionCount = statsData[11].subscription;
    const viewsCount = statsData[11].views;
  
    let usersPercentage = 0, viewsPercentage = 0, subscriptionPercentage = 0;
    let usersProfit = true, viewsProfit = true, subscriptionProfit = true;
  
    if(statsData[10].users === 0) usersPercentage = usersCount * 100;
    if(statsData[10].views === 0) viewsPercentage = viewsCount * 100;
    if(statsData[10].subscription === 0) subscriptionPercentage = subscriptionCount * 100;
    else {
        const difference = {
            users: statsData[11].users - statsData[10].users,
            views: statsData[11].views - statsData[10].views,
            subscription: statsData[11].subscription - statsData[10].subscription,
        };
  
        usersPercentage = (difference.users / statsData[10].users) * 100;
        viewsPercentage = (difference.views / statsData[10].views) * 100;
        subscriptionPercentage = (difference.subscription / statsData[10].subscription) * 100;
        if (usersPercentage < 0) usersProfit = false;
        if (viewsPercentage < 0) viewsProfit = false;
        if (subscriptionPercentage < 0) subscriptionProfit = false;
    }
  
    res.json({
        success: true,
        stats: statsData,
        usersCount,
        subscriptionCount,
        viewsCount,
        subscriptionPercentage,
        viewsPercentage,
        usersPercentage,
        subscriptionProfit,
        viewsProfit,
        usersProfit,
    });
});
