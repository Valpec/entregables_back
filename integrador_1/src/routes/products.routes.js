import { Router } from 'express';

// import ProductService from '../dao/fileSystem/productService.js';
import ProductService from '../dao/db/products.service.js'


const router = Router();
let productService = new ProductService()


router.get('/', async (req, res) => {
    try {
        let { limit } = req.query;
        let prods = await productService.getProducts()
        if (limit) {
            res.send(prods.slice(0, (parseInt(limit))))
        } else {
            res.send(prods)
        }
    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando los productos" })
    }

})

router.get('/:pid', async (req, res) => {

    let prod = await productService.getProductsById(req.params.pid)
    if (prod) {
        res.send(prod)
    } else {
        res.status(400).send({ error: "400", message: "El id es invalido o no existe." });
    }

})

router.post('/', async (req, res) => {
    try {
        let prod = req.body
        await productService.addProduct(prod)
        res.status(201).send({ message: "Producto agregado con exito" });
    } catch (error) {
        res.status(400).send({ error: "400", message: `Error: ${error}` })
    }
})


router.put('/:pid', async (req, res) => {
    try {
        let pid = parseInt(req.params.pid)
        let prod = req.body
        await productService.updateProduct(pid, prod)
        res.status(200).send({ message: "Producto actualizado con exito" });
    } catch (error) {
        res.status(400).send({ error: "400", message: "El id es invalido o no existe." });
    }


})

router.delete('/:pid', async (req, res) => {
    try {
        let pid = req.params.pid
        await productService.deleteProduct(pid)
        res.status(200).send({ message: "Producto eliminado con exito" });
    } catch (error) {
        res.status(400).send({ error: "400", message: "El id es invalido o no existe." });
    }

})
export default router