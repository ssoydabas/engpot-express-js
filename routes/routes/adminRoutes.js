import express from "express";
import {
  get_fetchAllUsers,
  get_fetchUser,
  post_editUserInfo,
  post_assignStudentToTeacher,
  post_removeTeacherFromStudent,
  post_deleteUser,
  get_findTeacherByStudentId,
  post_emailMe,
} from "../../controllers/adminControllers.js";

import {adminProtection} from "../routeProtection.js";

const router = express.Router();

router.get("/fetchAllUsers/:filter", get_fetchAllUsers);

router.get("/fetchUser/:userId", get_fetchUser);

router.post("/editUserInfo", adminProtection, post_editUserInfo);

router.post("/assignStudentToTeacher", adminProtection, post_assignStudentToTeacher);

router.post("/removeTeacherFromStudent", adminProtection, post_removeTeacherFromStudent);

router.post("/deleteUser", adminProtection, post_deleteUser); // ! Not used in react for now

router.get("/findTeacherByStudentId/:studentId", get_findTeacherByStudentId);

router.post("/emailMe", post_emailMe);

export default router;
