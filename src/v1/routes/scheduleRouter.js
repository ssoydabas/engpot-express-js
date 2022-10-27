import express from "express";

import scheduleController from "../controllers/scheduleController.js";

const router = express.Router();

router.get("/fetchSchedule", scheduleController.fetchSchedule);

router.post("/updateSchedule/add", scheduleController.updateSchedule_add);

router.post("/updateSchedule/edit", scheduleController.updateSchedule_edit);

router.delete("/updateSchedule/remove", scheduleController.updateSchedule_remove);

export default router;
