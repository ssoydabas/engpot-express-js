import express from "express";
import {
  get_studentsByTeacherId,
  get_scheduleByTeacherId,
  post_planLesson,
  post_concludeLesson,
  post_planSpeakingLesson,
  post_concludeSpeakingLesson,
  post_addAssignment,
  post_markAssignment,
} from "../../controllers/teacherControllers.js";

import { teacherProtection } from "../routeProtection.js";

const router = express.Router();

router.get("/studentsByTeacherId/:teacherId", teacherProtection, get_studentsByTeacherId);

router.get("/scheduleByTeacherId/:teacherId", teacherProtection, get_scheduleByTeacherId);


router.post("/planLesson", teacherProtection, post_planLesson);

router.post("/concludeLesson", teacherProtection, post_concludeLesson);

router.post("/planSpeakingLesson", teacherProtection, post_planSpeakingLesson);

router.post("/concludeSpeakingLesson", teacherProtection, post_concludeSpeakingLesson);

router.post("/addAssignment", teacherProtection, post_addAssignment);

router.post("/markAssignment", teacherProtection, post_markAssignment);

export default router;
