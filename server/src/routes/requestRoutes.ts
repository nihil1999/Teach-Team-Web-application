import { Router } from "express";
import { getAvatars } from "../controllers/avatarController";
import { getCourses, getLecturerCourses } from "../controllers/courseController";

const router = Router();

// Define route endpoints
router.get("/getAllAvatars", getAvatars);
router.get("/getAllCourses", getCourses);
router.get("/getLecturerCourses/:userID", getLecturerCourses);

export default router;