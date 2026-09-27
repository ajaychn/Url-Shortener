import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import { getMe, login, logout, register } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/logout", asyncHandler(logout));
router.get("/me",protect,asyncHandler(getMe)
);
export default router;