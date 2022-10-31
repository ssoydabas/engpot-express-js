import express from "express";

import adminController from "../controllers/adminController.js";

const router = express.Router();

router.post("/editUserInformation", adminController.editUserInformation);

router.delete("/deleteUser", adminController.deleteUser);

router.post("/createTeacherStudent", adminController.createTeacherStudent);

router.delete("/deleteTeacherStudent", adminController.deleteTeacherStudent);

router.get("/findTeacherByStudentId/:studentId", adminController.findTeacherByStudentId);

router.post("/contactAdmins", adminController.contactAdmins);

export default router;
