import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { contact, courseRequest, getDashboardStats } from "../controllers/otherController.js";

const router = express.Router();

router.post("/contact",contact);

router.post("/courserequest",courseRequest);

router.get("/admin/stats",getDashboardStats);

export default router;