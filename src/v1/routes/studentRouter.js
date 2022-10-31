import express from "express";

import studentController from "../controllers/studentController.js";

import { isAuthenticated, isStudent } from "./util/routeProtection.js";

const router = express.Router();

router.get(
  "/fetchLessonHistory",
  isAuthenticated,
  studentController.fetchLessonHistory
);

router.get(
  "/fetchAssignmentHistory",
  isAuthenticated,
  studentController.fetchAssignmentHistory
);

router.get(
  "/fetchSingleAssignment/:assignmentId",
  isAuthenticated,
  studentController.fetchSingleAssignment
);

router.post(
  "/completeSingleAssignment",
  isAuthenticated,
  isStudent,
  studentController.completeSingleAssignment
);

export default router;
