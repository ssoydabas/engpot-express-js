import express from "express";
import {
  post_login,
  post_signUp,
  post_resendConfirmation,
  get_confirmAccount,
  post_requestPasswordReset,
  post_resetPassword,
  post_changeProfileName,
  post_changeProfilePicture,
} from "../../controllers/authControllers.js";

import { routeProtection } from "../routeProtection.js";

const router = express.Router();

router.post("/login", post_login);
router.post("/signUp", post_signUp);
router.post("/resendConfirmation", post_resendConfirmation);
router.get("/confirmAccount/:emailConfirmationCode", get_confirmAccount);
router.post("/requestPasswordReset", post_requestPasswordReset);
router.post("/resetPassword", post_resetPassword);
router.post("/changeProfileName", routeProtection, post_changeProfileName);
router.post("/changeProfilePicture", routeProtection, post_changeProfilePicture); // ! NOT DONE [REACT]

export default router;
