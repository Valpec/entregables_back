import { Router } from "express";
import { authorization, passportCall } from "../utils.js";
import { getProductsController , getProdIdController, postProductsController, putProdIdController, deleteProductController, getProductsFaker } from '../controllers/products.controller.js'
import errorHandler from '../services/errors/middlewares/errorHandler.js'

const router = Router();

router.get('/mockingproducts', getProductsFaker)

router.get('/', getProductsController)

router.get('/:pid', getProdIdController)


router.post('/',  passportCall('jwt'),authorization('admin', 'premium'), postProductsController)

router.put('/:pid', passportCall('jwt'), authorization('admin', 'premium'), putProdIdController)

router.delete('/:pid', passportCall('jwt'),authorization('admin', 'premium'), deleteProductController)

router.use(errorHandler)

export default router