import express from "express";

import studentController from "../controllers/studentController.js";

const router = express.Router();

router.get("/fetchLessonHistory", studentController.fetchLessonHistory);

router.get("/fetchAssignmentHistory", studentController.fetchAssignmentHistory);

router.get("/fetchSingleAssignment/:assignmentId", studentController.fetchSingleAssignment);

router.post("/completeSingleAssignment", studentController.completeSingleAssignment);

export default router;
