import express from "express";
import {
  get_lessonHistory,
  get_assignmentHistory,
  get_singleAssignmentHistory,
  post_doAssignment,
} from "../../controllers/studentControllers.js";

import { studentProtection, student_teacherProtection } from "../routeProtection.js"

const router = express.Router();

router.get("/getLessonHistory", student_teacherProtection, get_lessonHistory);

router.get("/getAssignmentHistory", student_teacherProtection, get_assignmentHistory);

router.get("/getSingleAssignmentHistory/:assignmentId", student_teacherProtection, get_singleAssignmentHistory);

router.post("/doAssignment", studentProtection, post_doAssignment);

export default router;