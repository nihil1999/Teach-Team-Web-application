import { Router } from "express";
import { deleteRanking, getRankingsByUser, insertAndUpdateRanking, getAllSelectedApplications  } from "../controllers/applicantRankingController";


const router = Router();

// Define ranking-related routes
router.get("/getExistingRanking/:userId", getRankingsByUser);
router.post("/insertAndUpdate", insertAndUpdateRanking);
router.delete("/delete", deleteRanking);
router.get("/stats", getAllSelectedApplications);
export default router;