import express from "express";
import {
  post_changeProfileName,
  post_changeProfilePicture,
} from "../../controllers/userControllers.js";

import { routeProtection } from "../routeProtection.js";

const router = express.Router();

router.post("/changeProfileName", routeProtection, post_changeProfileName);
router.post("/changeProfilePicture", routeProtection, post_changeProfilePicture); // ! NOT DONE [REACT]

export default router;
