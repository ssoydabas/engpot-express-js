import express from "express";

import teacherController from "../controllers/teacherController.js";

const router = express.Router();

router.get("/studentsByTeacherId/:teacherId", teacherController.studentsByTeacherId);

router.post("/planLesson", teacherController.planLesson);

router.post("/concludeLesson", teacherController.concludeLesson);

router.post("/assignTask", teacherController.assignTask);

router.post("/markTask", teacherController.markTask);

export default router;
