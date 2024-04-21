import { Router } from 'express';

import { postCartController, getCartIdController, postCartIdController, deleteCartProdIdController, deleteCartProdsController, putCartController, putCartQtyController} from '../controllers/carts.controller.js'

const router = Router();

router.post('/', postCartController)

router.get('/:cid', getCartIdController)

// POST de cada producto en el carrito. En el caso de ya existir, aumenta su cantidad en uno
router.post('/:cid/product/:pid', postCartIdController)

//DELETE del producto seleccionado del carrito
router.delete('/:cid/product/:pid', deleteCartProdIdController)

//DELETE de todos los prods del carrito
router.delete('/:cid', deleteCartProdsController)

//PUT actualiza el carrito con un arreglo de prods con el formato de paginacion
router.put('/:cid', putCartController)

//PUT actualiza SOLO la cant de ejemplares del prod por cualquier cant pasada desde el req.body
router.put('/:cid/product/:pid', putCartQtyController)

export default router;
