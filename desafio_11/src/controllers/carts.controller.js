import { cartService, productService, ticketService } from "../services/service.js";
import EErrors from "../services/errors/errors-enum.js";
import CustomError from "../services/errors/CustomError.js";
const postCartController = async(req, res) => {
    try{
        const cart = await cartService.createCart()
        // res.status(201).send({message: "Cart creado con exito"});
        res.status(201).send(cart);

    }catch(error){
        res.status(500).send({error: "500", message: "No se pudo crear el carrito"});
    }   
}

const getCartIdController = async(req,res) => {
    try{
        let cid = req.params.cid
        
        const result = await cartService.listCartProds(cid)
        if (!result ) {
            CustomError.createError({
                name: "Cart Consult Error",
                message: "Error tratando de consultar el carrito.",
                cause: 'Datos incompletos',
                code: EErrors.INVALID_TYPES_ERROR
            })
        }
        //nuevo
        res.status(200).send({message: "Carrito obtenido con exito"})
    } catch(error){
        res.status(500).send({error: "500", message: "No se pudo obtener el carrito"});
    } 
}

const postCartIdController = async(req,res) => {
    // try{
        let cid = req.params.cid
        let pid = req.params.pid
        if (!cid || !pid) {
            CustomError.createError({
                name: "Cart Update Error",
                message: "Error tratando de actualizar el carrito.",
                cause: 'Datos incompletos',
                code: EErrors.INVALID_TYPES_ERROR
            })
        }
        await cartService.addToCart(cid, pid, req.user.email)
        res.status(201).send({message: "Producto agregado con exito"});
    // } catch(error){
    //     res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    // }
}

const deleteCartProdIdController = async(req, res) => {
    try{
        let cid = req.params.cid
        let pid = req.params.pid
        await cartService.deleteProdFromCart(cid, pid)
        res.status(200).send({ message: "Producto eliminado con exito del carrito" });

    } catch(error){
        res.status(500).send({error: "500", message: "Error eliminando el producto"});
    }
}

const deleteCartProdsController = async(req, res) => {
    try{
        console.log('entra delete')
        let cid = req.params.cid
        await cartService.deleteCart(cid)
        res.status(200).send({ message: "Carrito eliminado con exito" });

    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
}

const putCartController = async(req, res) => {
    try{
        let cid = req.params.cid
        await cartService.updateCart(cid)

        res.status(200).send({ message: "Carrito actualizado con exito" });
    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
}

const putCartQtyController =  async(req, res) => {
    try{
        let cid = req.params.cid
        let pid = req.params.pid
        let qty = req.body.qty

        await cartService.updateCartQty(cid, pid, qty)
        res.status(200).send({ message: "Carrito actualizado con exito" });

    } catch(error){
        res.status(500).send({error: "500", message: "Error en la actualización del carrito"});
    }
}

const viewCartController = async (req, res) => {
    try {
        let cid = req.params.cid
        let cart = await cartService.listCartProds(cid)
        let user = req.user
        let data = {cart, user}

        req.user ? res.render('cart', data) : res.send('Debe estar loguado para ver este contenido')

    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando el carrito" })
    }
}


const getPurchaseController = async(req,res) => {
    try{
        let cid = req.params.cid
        let userEmail = req.user.email
       
        let prodsInCart = await cartService.listCartProds(cid)
        console.log('el prod en cart', prodsInCart)
        if(prodsInCart.products.length === 0){
            console.warn(`No se puede concretar la compran, no existen productos en el carrito`);
            return res.status(204).send({ error: "Not found", message: `No existen productos en el carrito` });
        }
        let sumProds = 0

        for (let e of prodsInCart.products) {
            if(e.product.stock >= e.quantity){
                let newStock = e.product.stock - e.quantity
                sumProds += e.quantity * e.product.price
                let prodId = e.product._id.toString()

                await productService.updateProductStock(e.product._id, newStock)
                await cartService.deleteProdFromCart(cid, prodId )
            }
        };
        let newTicket = await ticketService.createTicket(sumProds, userEmail)
        let data = {newTicket: newTicket, notInStock: prodsInCart.products}
        res.render('purchase', data)

    }catch(error){
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando el carrito" })
    }
}

export { postCartController, getCartIdController, postCartIdController, deleteCartProdIdController, deleteCartProdsController, putCartController, putCartQtyController, viewCartController, getPurchaseController}