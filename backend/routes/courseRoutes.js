import express from "express"
import { getAllCourses, createCourse, addLecture, getCourseLectures , deleteCourse, deleteLecture} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated , authorizeSubscribers } from "../middlewares/auth.js";

const router = express.Router();

router.get("/courses",getAllCourses);

router.post("/createcourse", isAuthenticated, authorizeAdmin, singleUpload, createCourse);

router.get("/course/:id",isAuthenticated, authorizeSubscribers, getCourseLectures)

router.post("/course/:id", isAuthenticated, authorizeAdmin, singleUpload, addLecture);

router.delete("/course/:id",isAuthenticated, authorizeAdmin, deleteCourse);

router.delete("/lecture",isAuthenticated, authorizeAdmin, deleteLecture);

export default router;
