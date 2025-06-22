import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
} from "../controllers/user/index.js";
const router = express.Router();

router.patch("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/get-listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);

export default router;
