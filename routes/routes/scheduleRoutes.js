import express from "express";
import { get_fetchPublicSchedule, post_updatePublicSchedule } from "../../controllers/scheduleControllers.js";

const router = express.Router();

router.get("/publicSchedule/fetch", get_fetchPublicSchedule);

router.post("/publicSchedule/update", post_updatePublicSchedule);

export default router;
