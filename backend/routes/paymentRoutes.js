import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { buySubscription, paymentVerification, cancelSubscription } from "../controllers/paymentController.js";

const router = express.Router();

router.get("/subscribe",isAuthenticated,buySubscription);

router.post("/paymentverification",isAuthenticated,paymentVerification);

router.get("/razorpaykey",isAuthenticated,paymentVerification);

router.delete("/subscribe/cancel",isAuthenticated, cancelSubscription);

export default router;