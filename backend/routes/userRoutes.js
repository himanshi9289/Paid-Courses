import express from "express"
import { addToPlaylist, changePassword, deleteMyProfile, deleteUser, forgotPassword, getAllUsers, getUser, loginUser, logoutUser, registerUser, removeFromPlaylist, resetPassword, updateProfile, updateProfilePicture, updateUserRole } from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js"
import singleUpload from "../middlewares/multer.js"

const router = express.Router();

router.post("/register",singleUpload, registerUser);

router.get("/me",getUser);

router.delete("/me",isAuthenticated, deleteMyProfile);

router.post('/login',loginUser);

router.get('/logout',logoutUser);

router.put('/changepassword',isAuthenticated,changePassword);

router.put('/updateprofile',isAuthenticated,updateProfile);

router.put('/updateprofilepicture',isAuthenticated, singleUpload, updateProfilePicture);

router.post('/forgotpassword',forgotPassword);

router.put('/resetpassword/:token',resetPassword);

router.post('/addtoplaylist',isAuthenticated,addToPlaylist);

router.delete('/removefromplaylist',isAuthenticated,removeFromPlaylist);

router.get("/admin/users",isAuthenticated, authorizeAdmin, getAllUsers);

router.put("/admin/user/:id",isAuthenticated,authorizeAdmin, updateUserRole);

router.delete("/admin/user/:id",isAuthenticated,authorizeAdmin, deleteUser);

export default router;