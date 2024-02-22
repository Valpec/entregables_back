import express from 'express';
import ProductManager from '../ProductManager.js';
const router = express.Router();

const productManager = new ProductManager();


router.get('/', async (req, res) => {
    try {
        let prods = await productManager.getProducts()
        res.render('home',  { style: "style.css", prods })
    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando los productos" })
    }

})

router.get('/realtimeproducts', async(req, res)=>{
    res.render('realTimeProducts',  { style: "style.css" })
})

export default router;