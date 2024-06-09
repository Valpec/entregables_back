import { Router } from "express";
import passport from "passport";
import { passportCall } from "../utils.js";
import { putPremiumUserController , resetPassword} from '../controllers/users.controller.js';
const router = Router();


router.put('/premium/:uid', putPremiumUserController)
router.get('/resetPassword', (req, res) => {
    res.render('resetPassword')
})
router.post('/resetPassword', passportCall('jwt'), resetPassword)


export default router;
