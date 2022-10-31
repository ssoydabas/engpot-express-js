import express from "express";

import scheduleController from "../controllers/scheduleController.js";

import { isAuthenticated } from "./util/routeProtection.js";

const router = express.Router();

router.get("/fetchSchedule", isAuthenticated, scheduleController.fetchSchedule);

router.post(
  "/updateSchedule/add",
  isAuthenticated,
  scheduleController.updateSchedule_add
);

router.post(
  "/updateSchedule/edit",
  isAuthenticated,
  scheduleController.updateSchedule_edit
);

router.delete(
  "/updateSchedule/remove",
  isAuthenticated,
  scheduleController.updateSchedule_remove
);

export default router;
