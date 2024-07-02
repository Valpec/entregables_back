import { Router } from "express";
import passport from "passport";
import { passportCall } from "../utils.js";
import { putPremiumUserController , resetPassword, postDocumentController} from '../controllers/users.controller.js';
const router = Router();

import { uploader } from "../utils.js";


router.put('/premium/:uid' ,putPremiumUserController)

router.get('/resetPassword', (req, res) => {
    res.render('resetPassword')
})
router.post('/resetPassword', passportCall('jwt'), resetPassword)

router.post('/:uid/documents',passportCall('jwt'), uploader.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'productPhotos', maxCount: 10 },
    { name: 'documents', maxCount: 3 }
]) , postDocumentController)



export default router;
