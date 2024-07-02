import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true,"Please enter title"], 
        minLength: [4,"Please add atleast 4 characters in course title"], 
        maxLength: [50,"Can't add more than 50 characters in course title"]
    },
    description: {
        type: String,
        required: [true,"Please enter description of course"],
        minLength: [10,"Please add atleast 4 characters in course title"]
    },
    lectures: [{
        title: {
            type:String,
            required: true
        },
        description: {
            type:String,
            required: true
        },
        videos: {
            public_id: {
                type: String,
                required: true
            }, 
            url: {
                type: String,
                required: true
            }
        }
    }],
    poster: {
        public_id: {
            type: String,
            required: true
        }, 
        url: {
            type: String,
            required: true
        }
    },
    views: {
        type: Number,
        default:0
    },
    numOfVideos: {
        type: Number,
        default:0
    },
    category: {
        type:String, 
        required:[true,"Please select the category"]
    },
    createdBy: {
        type: String, 
        required:[true,"Add Course Creator name"]
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

export default mongoose.model("Course",courseSchema);