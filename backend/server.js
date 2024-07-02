import app from "./app.js";
import {config} from "dotenv";
import RazorPay from "razorpay";
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary";
import nodecron from "node-cron"
import Stats from "./models/Stats.js";

config({
    path:"./config/config.env",
});

connectDB();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

nodecron.schedule("0 0 0 1 * *", async ()=>{
    try{
        await Stats.create();
    }catch(e){
        console.log(e);
    }
})

export const instance = new RazorPay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

app.listen(process.env.PORT,()=>{
    console.log("Listening on port : "+process.env.PORT);
});
