import express from "express";
import {
  post_login,
  post_signUp,
  post_resendConfirmation,
  get_confirmAccount,
  post_requestPasswordReset,
  post_resetPassword,
} from "../../controllers/authControllers.js";

const router = express.Router();

router.post("/login", post_login);
router.post("/signUp", post_signUp);
router.post("/resendConfirmation", post_resendConfirmation);
router.get("/confirmAccount/:emailConfirmationCode", get_confirmAccount);
router.post("/requestPasswordReset", post_requestPasswordReset);
router.post("/resetPassword", post_resetPassword);

export default router;
