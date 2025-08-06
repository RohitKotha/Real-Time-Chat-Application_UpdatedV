import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, updateUserLanguage } from "../controllers/user.controller.js";

const router = express.Router();


router.get("/", protectRoute, getUsersForSidebar);
router.patch("/language", protectRoute, updateUserLanguage);

export default router;
