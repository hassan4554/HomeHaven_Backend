import express from "express";
import { validateData } from "../middlewares/validation.js";
import { signupSchema } from "../schema/index.js";
import { signin, signup, google, signout } from "../controllers/auth/index.js";
const router = express.Router();

router.post("/signup", validateData(signupSchema), signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signout);

export default router;
