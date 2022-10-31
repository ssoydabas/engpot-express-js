import express from "express";

import adminController from "../controllers/adminController.js";

import { isAdmin, isAuthenticated } from "./util/routeProtection.js";

const router = express.Router();

router.post(
  "/editUserInformation",
  isAuthenticated,
  isAdmin,
  adminController.editUserInformation
);

router.delete(
  "/deleteUser",
  isAuthenticated,
  isAdmin,
  adminController.deleteUser
);

router.post(
  "/createTeacherStudent",
  isAuthenticated,
  isAdmin,
  adminController.createTeacherStudent
);

router.delete(
  "/deleteTeacherStudent",
  isAuthenticated,
  isAdmin,
  adminController.deleteTeacherStudent
);

router.get(
  "/findTeacherByStudentId/:studentId",
  isAuthenticated,
  adminController.findTeacherByStudentId
);

router.post("/contactAdmins", adminController.contactAdmins);

export default router;
