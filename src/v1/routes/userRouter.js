import express from "express";

import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/fetchUsers", userController.fetchUsers);

router.get("fetchUserById/:userId", userController.fetchUserById);

router.post("/createUser", userController.createUser);

router.post("/verifyUser", userController.verifyUser);

router.post("/sendConfirmationCode", userController.sendConfirmationCode);

router.get("/confirmAccount/:emailConfirmationCode", userController.confirmUserAccount);

router.post("/requestNewPassword", userController.requestNewPassword);

router.post("/resetPassword", userController.resetPassword);

router.post("/changePersonalInformation", userController.changePersonalInformation);

export default router;
