import express from 'express';
import cookieParser from 'cookie-parser';
// import passport from 'passport';
import { authorization, passportCall } from '../utils.js';
import { viewProductsController , viewProductDetController} from '../controllers/products.controller.js';
import { viewCartController } from '../controllers/carts.controller.js';

const router = express.Router();
router.use(cookieParser("d3s4f105"));


router.get('/', async (req, res) => {
    try {
        req.user ? res.send('Ya esta logueado') : res.render('login')
    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error renderizando login" })
    }

})

router.get('/products', passportCall('jwt'), viewProductsController)

router.get('/products/:pid', passportCall('jwt'), viewProductDetController)

router.get('/carts/:cid', passportCall('jwt'), viewCartController)


router.get(`/api/sessions/register`, async (req, res) => {
    req.user ? res.send('Ya esta logueado') : res.render('register')
})

router.get(`/api/sessions/login`, async (req, res) => {
    req.user ? res.send('Ya esta logueado') : res.render('login')
})

router.get('/github/login', (req, res) => {
    res.render('githubLogin')
})

router.get('/github/error', (req, res) => {
    res.render('error', { error: "No se pudo atenticar usando github" })
})


router.get(`/profile`, passportCall('jwt'), async (req, res) => {
    if (req.user) {

        res.render('profile', {
            user: req.user
        })
    } else {
        res.send(`Es necesario estar logueado para ver esta info`)
    }

})

router.get('/realtimeproducts', passportCall('jwt'), authorization('admin'), (req, res) => {
    res.render('realTimeProducts');
});

export default router;