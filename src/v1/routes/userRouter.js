import express from "express";

import userController from "../controllers/userController.js";

import { isAuthenticated, isTeacher } from "./util/routeProtection.js";

const router = express.Router();

router.get("/fetchUsers", isAuthenticated, isTeacher, userController.fetchUsers);

router.get("fetchUserById/:userId", isAuthenticated, isTeacher, userController.fetchUserById);

router.post("/createUser", userController.createUser);

router.post("/verifyUser", userController.verifyUser);

router.post("/sendConfirmationCode", userController.sendConfirmationCode);

router.get(
  "/confirmAccount/:emailConfirmationCode",
  userController.confirmUserAccount
);

router.post("/requestNewPassword", userController.requestNewPassword);

router.post("/resetPassword", userController.resetPassword);

router.post(
  "/changePersonalInformation",
  isAuthenticated,
  userController.changePersonalInformation
);

export default router;
