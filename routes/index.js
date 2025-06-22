import express from "express";
const router = express.Router();
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import listingRoutes from "./listing.routes.js";

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/listing", listingRoutes);

export default router;
