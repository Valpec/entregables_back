import express from 'express';
import cookieParser from 'cookie-parser';
import ProductService from '../dao/db/products.service.js';
import CartService from '../dao/db/carts.service.js';
import passport from 'passport';
import { authorization, passportCall } from '../utils.js';


const router = express.Router();

const productManager = new ProductService();
const cartService = new CartService();

router.use(cookieParser("d3s4f105"));

router.get('/', async (req, res) => {
    try {
        req.user ? res.send('Ya esta logueado') : res.render('login')
    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error renderizando login" })
    }

})

router.get('/products', passportCall('jwt'), async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        let sort = req.query.sort;
        let query = req.query.query;
        let prods = await productManager.getProducts(limit, page, sort, query)

        let data = { prods: prods, user: req.user }
        res.render(`products`, data)

    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error obteniendo productos" })
    }
})

router.get('/products/:pid', passportCall('jwt'), async (req, res) => {
    try {
        let pid = req.params.pid
        let prod = await productManager.getProductsById(pid)
        req.user ? res.render('productsDetail', prod) : res.send('Debe estar loguado para ver este contenido')

    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando productos" })
    }
})

router.get('/carts/:cid', passportCall('jwt'), async (req, res) => {
    try {
        let cid = req.params.cid
        let cart = await cartService.listCartProds(cid)
        req.user ? res.render('cart', cart) : res.send('Debe estar loguado para ver este contenido')

    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando el carrito" })
    }
})



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