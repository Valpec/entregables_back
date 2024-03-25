import { Router } from 'express';
//fileSystem:
// import CartService from '../dao/fileSystem/CartManager.js'

//mongodb
import CartService from '../dao/db/carts.service.js';

const router = Router();
let cartService = new CartService()


//ENDPOINTS

router.post('/', async(req, res) => {
    try{
        await cartService.createCart()
        res.status(201).send({message: "Cart creado con exito"});
    }catch(error){
        res.status(500).send({error: "500", message: "No se pudo crear el carrito"});
    }
    
})

router.get('/:cid', async(req,res) => {
    try{
        let cid = req.params.cid
        res.send(await cartService.listCartProds(cid))
    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    } 
})

// POST de cada producto en el carrito. En el caso de ya existir, aumenta su cantidad en uno
router.post('/:cid/product/:pid', async(req,res) => {
    try{
        let cid = req.params.cid
        let pid = req.params.pid
        await cartService.addToCart(cid, pid)
        res.status(201).send({message: "Producto agregado con exito"});
    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
    
})

//DELETE del producto seleccionado del carrito
router.delete('/:cid/product/:pid', async(req, res) => {
    try{
        let cid = req.params.cid
        let pid = req.params.pid
        await cartService.deleteProdFromCart(cid, pid)
        res.status(200).send({ message: "Producto eliminado con exito" });

    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
})

//DELETE de todos los prods del carrito
router.delete('/:cid', async(req, res) => {
    try{
        let cid = req.params.cid
        await cartService.deleteCart(cid)
        res.status(200).send({ message: "Carrito eliminado con exito" });

    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
})

//PUT actualiza el carrito con un arreglo de prods con el formato de paginacion
router.put('/:cid', async(req, res) => {
    try{
        let cid = req.params.cid
        await cartService.updateCart(cid)

        res.status(200).send({ message: "Carrito actualizado con exito" });
    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
})

//PUT actualiza SOLO la cant de ejemplares del prod por cualquier cant pasada desde el req.body
router.put('/:cid/product/:pid', async(req, res) => {
    try{
        let cid = req.params.cid
        let pid = req.params.pid
        let qty = req.body.qty

        await cartService.updateCartQty(cid, pid, qty)
        res.status(200).send({ message: "Carrito actualizado con exito" });

    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
})
export default router;
