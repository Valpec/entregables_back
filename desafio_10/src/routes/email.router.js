import { Router } from "express";
import { sendEmail, sendEmailWithAttachments, sendEmailPasswordReset } from '../controllers/email.controller.js';

const router = Router();

router.get("/", sendEmail);
router.get("/attachments", sendEmailWithAttachments);
router.get("/resetPasswordRequest", (req, res) => {
    res.render('emailRequestResetPassword')
})
router.post("/resetPasswordRequest", sendEmailPasswordReset)


export default router;