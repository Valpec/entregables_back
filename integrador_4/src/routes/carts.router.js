import { Router } from 'express';
import { passportCall , authorization} from '../utils.js';
import errorHandler from '../services/errors/middlewares/errorHandler.js'

import { postCartController, getCartIdController, postCartIdController, deleteCartProdIdController, deleteCartProdsController, putCartController, putCartQtyController, getPurchaseController} from '../controllers/carts.controller.js'

const router = Router();

router.post('/', postCartController)

router.get('/:cid', authorization('user'), getCartIdController)

// POST de cada producto en el carrito. En el caso de ya existir, aumenta su cantidad en uno
router.post('/:cid/product/:pid', passportCall('jwt'), authorization('user', 'premium'), postCartIdController)

//DELETE del producto seleccionado del carrito
router.delete('/:cid/product/:pid', passportCall('jwt'), authorization('user', 'premium'), deleteCartProdIdController)

//DELETE de todos los prods del carrito
router.delete('/:cid', authorization('user', 'premium'), deleteCartProdsController)

//PUT actualiza el carrito con un arreglo de prods con el formato de paginacion
router.put('/:cid', authorization('user', 'premium'), putCartController)

//PUT actualiza SOLO la cant de ejemplares del prod por cualquier cant pasada desde el req.body
router.put('/:cid/product/:pid', authorization('user', 'premium'), putCartQtyController)

router.get('/:cid/purchase', passportCall('jwt'), authorization('user', 'premium'), getPurchaseController)


router.use(errorHandler)

export default router;
