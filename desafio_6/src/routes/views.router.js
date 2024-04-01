import express from 'express';
import cookieParser from 'cookie-parser';
// import ProductService from '../dao/fileSystem/ProductManager.js';
import ProductService from '../dao/db/products.service.js';
import CartService from '../dao/db/carts.service.js';


const router = express.Router();

const productManager = new ProductService();
const cartService = new CartService();

router.use(cookieParser("d3s4f105"));

router.get('/', async (req, res) => {
    try {
        req.session.user ? res.send('Ya esta logueado') : res.render('login')
    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error renderizando login" })
    }

})

router.get('/products', async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        let sort = req.query.sort;
        let query = req.query.query;
        let prods = await productManager.getProducts(limit, page, sort, query)

        let data = { prods: prods, user: req.session }

        req.session.user ? res.render('products', data) : res.send('Debe estar loguado para ver este contenido')

    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error obteniendo productos" })
    }
})

router.get('/products/:pid', async (req, res) => {
    try {
        let pid = req.params.pid
        let prod = await productManager.getProductsById(pid)
        req.session.user ? res.render('productsDetail', prod) : res.send('Debe estar loguado para ver este contenido')
        
    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando productos" })
    }
})

router.get('/carts/:cid', async (req, res) => {
    try {
        let cid = req.params.cid
        let cart = await cartService.listCartProds(cid)

        req.session.user ? res.render('cart', cart) : res.send('Debe estar loguado para ver este contenido')

    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando el carrito" })
    }
})

router.get(`/api/sessions/register`, async (req, res) => {
    req.session.user ? res.send('Ya esta logueado') : res.render('register')
})

router.get(`/api/sessions/login`, async (req, res) => {
    req.session.user ? res.send('Ya esta logueado') : res.render('login')
})

router.get('/github/login', (req, res) => {
    res.render('githubLogin')
})

router.get('/github/error', (req, res) => {
    res.render('error', { error: "No se pudo atenticar usando github" })
})


router.get(`/profile`, async (req, res) => {
    if (req.session.user) {
        res.render('profile', {
            user: req.session.user
        })
    } else {
        res.send(`Es necesario estar logueado para ver esta info`)
    }

})


function auth(req, res, next) {
    if (req.session.user.email === 'adminCoder@coder.com' && req.session.role === 'admin') {
        return next();
    } else {
        return res.status(403).send('Usuario no autorizado.')
    }
}

router.get('/realtimeproducts', auth, (req, res) => {
    res.render('realTimeProducts');
});

export default router;