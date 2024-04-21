import { Router } from "express";
import passport from "passport";

import { getSessionGithubController, postSessionController, getSessionCurrentController, getSessionLogoutController} from '../controllers/session.controller.js'


import { passportCall, generateJWToken} from '../utils.js'

const router = Router()


router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
})


router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/github/error' }), getSessionGithubController)

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' , session: false}), async (req, res) => {
    res.status(201).send({ stauts: 'success', message: "User creado exitosamente" })
})


router.post("/login", postSessionController );


router.get("/logout", getSessionLogoutController);

router.get("/current", passportCall('jwt'), getSessionCurrentController);


router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Error procesando el registr" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Error procesando el login" });
});


export default router;

