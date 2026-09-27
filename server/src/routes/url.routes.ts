import { Router } from "express";
import { createShortUrl, deleteUrl, getUrls } from "../controllers/url.controller";
import asyncHandler from "../utils/asyncHandler";
import { protect } from "../middleware/auth.middleware";

const router = Router()

router.post('/',protect, asyncHandler(createShortUrl))
router.get('/',protect,asyncHandler(getUrls))
router.delete("/:id",protect,asyncHandler(deleteUrl)
);
export default router