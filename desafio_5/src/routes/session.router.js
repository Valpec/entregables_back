import { Router } from "express";
import UserService from "../dao/db/user.service.js";

const router = Router()
const userService = new UserService()


router.post('/register', async (req, res) => {
    try {
        if (req.session.user) {
            res.send(`Sesion iniciada`)
        } else {
            const userData = req.body
            await userService.registerUser(userData)
            res.status(200).send({ message: "Usuario creado con exito" });
        }

    } catch (error) {
        console.error(error)
    }

})

router.post('/login', async (req, res) => {
    try {

            const userData = req.body
            await userService.loginUser(userData, req)
            res.status(200).send({ message: "Usuario logueado con exito" });
    } catch (error) {
        res.status(500).send({ error: '500', message: "Error logueando usuario" })
    }
})



router.get("/logout", (req, res) => {
    console.log(req.session)
    req.session.destroy(error => {
        if (error) {
            res.json({ error: 'logout error', mensaje: "Error al cerrar la sesion" });
        }
        res.render('login')
    });
});



export default router;

