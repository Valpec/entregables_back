import { Router } from "express";
import UserService from "../dao/db/user.service.js";
import passport from "passport";
// import { createHash, isValidPassword } from "../utils.js";

const router = Router()
const userService = new UserService()


router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
})


router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {
    const user = req.user

    req.session.user = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        age: user.age
    }

    if (req.session.user.email === "adminCoder@coder.com") {
        req.session.role = 'admin'
    }
    else {
        req.session.role = 'user'
    }
    res.redirect("/products")
})

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), async (req, res) => {
    console.log("Registrando nuevo usuario.");
    res.status(201).send({ stauts: 'success', message: "User creado exitosamente" })
})


router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    let user = req.user;
   
    if (!user) return res.status(401).send({ status: "error", error: "Credenciales incorrectas" })
    
    req.session.user = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        age: user.age
    }
    req.session.role = 'user'
    
    res.send({ status: "success", payload: req.session.user, message: "Logueo exitoso" });
});



router.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({ error: 'logout error', mensaje: "Error al cerrar la sesion" });
        }
        res.render('login')
    });
});

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Error procesando el registr" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Error procesando el registr" });
});


export default router;

