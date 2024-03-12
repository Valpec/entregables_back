import { Router } from 'express';
//fileSystem:
// import CartService from '../dao/fileSystem/CartManager.js'

//mongodb
import CartService from '../dao/db/carts.service.js';

const router = Router();
let cartService = new CartService()


router.post('/', async(req, res) => {
    try{
        console.log(`a crear`)
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
export default router;
