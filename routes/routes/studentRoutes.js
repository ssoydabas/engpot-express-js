import express from "express";
import {
  get_lessonHistory,
  get_assignmentHistory,
  get_singleAssignmentHistory,
  post_doAssignment,
} from "../../controllers/studentControllers.js";

const router = express.Router();

router.get("/getLessonHistory", get_lessonHistory);

router.get("/getAssignmentHistory", get_assignmentHistory);

router.get("/getSingleAssignmentHistory/:assignmentId", get_singleAssignmentHistory
);

router.post("/doAssignment", post_doAssignment);

export default router;