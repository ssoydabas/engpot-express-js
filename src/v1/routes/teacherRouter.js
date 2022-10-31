import express from "express";

import teacherController from "../controllers/teacherController.js";

import { isAuthenticated, isTeacher } from "./util/routeProtection.js";

const router = express.Router();

router.get(
  "/studentsByTeacherId/:teacherId",
  isAuthenticated,
  isTeacher,
  teacherController.studentsByTeacherId
);

router.post(
  "/planLesson",
  isAuthenticated,
  isTeacher,
  teacherController.planLesson
);

router.post(
  "/concludeLesson",
  isAuthenticated,
  isTeacher,
  teacherController.concludeLesson
);

router.post(
  "/assignTask",
  isAuthenticated,
  isTeacher,
  teacherController.assignTask
);

router.post(
  "/markTask",
  isAuthenticated,
  isTeacher,
  teacherController.markTask
);

export default router;
