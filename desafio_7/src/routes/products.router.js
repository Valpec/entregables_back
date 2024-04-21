import { Router } from "express";
import { getProductsController , getProdIdController, postProductsController, putProdIdController, deleteProductController } from '../controllers/products.controller.js'


const router = Router();


router.get('/', getProductsController)

router.get('/:pid', getProdIdController)

router.post('/', postProductsController)

router.put('/:pid', putProdIdController)

router.delete('/:pid', deleteProductController)

export default router