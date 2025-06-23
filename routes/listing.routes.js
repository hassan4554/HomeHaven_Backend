import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  searchListings,
} from "../controllers/listing/index.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import { validateData } from "../middlewares/validation.js";
import { createListingSchema, editListing } from "../schema/index.js";
const router = express.Router();

router.post(
  "/create",
  validateData(createListingSchema),
  verifyToken,
  createListing
);

router.delete("/delete/:id", verifyToken, deleteListing);
router.get("/get/:id", getListing);
router.patch(
  "/update/:id",
  validateData(editListing),
  verifyToken,
  updateListing
);
router.get("/search", searchListings);

export default router;
