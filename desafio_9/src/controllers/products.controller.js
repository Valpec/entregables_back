// import ProductService from '../services/dao/fileSystem/ProductManager.js'
// let productService = new ProductService()

import { productService } from "../services/service.js";
import { generateProduct } from "../utils.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/errors-enum.js";
import { generateProdErrorInfo } from "../services/errors/messages/product-creation-error-message.js";


const validateHasAllFields = async (prod) => {
    const valores = Object.values(prod)
    const missingFields = valores.filter(v => (v == ''));
    if (missingFields.length > 0) {
        return false
    } else {
        return true
    }
}
const getProductsController = async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        let sort = req.query.sort;
        let query = req.query.query;

        let prods = await productService.getProducts(limit, page, sort, query)

        res.send(prods)
    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando los productos" })
    }
}

const getProdIdController = async (req, res) => {
    let prod = await productService.getProductsById(req.params.pid)
    if (prod) {
        res.send(prod)
    } else {
        res.status(400).send({ error: "400", message: "El id es invalido o no existe." });
    }

}

const postProductsController = async (req, res) => {
    try {
        let prod = req.body
        const validated = await validateHasAllFields(prod)

        if (!validated) {
            console.log()
            CustomError.createError({
                name: "Product Creation Error",
                cause: generateProdErrorInfo(prod),
                message: "Dato ingresado invalido",
                code: EErrors.INVALID_TYPES_ERROR

            })

        }
        await productService.addProduct(prod)
        res.status(201).send({ message: "Producto agregado con exito" });
    } catch (error) {
        // console.error(error)
        req.logger.error(error)
        res.status(400).send({ error: "400", message: `Error: ${error}`})
        
    }
}

const putProdIdController = async (req, res) => {
    try {
        let pid = req.params.pid
        let prod = req.body
        const validated = await validateHasAllFields(prod)

        if (!validated || !pid) {
            CustomError.createError({
                name: "Product Update Error",
                message: "Dato ingresado invalido",
                code: EErrors.INVALID_TYPES_ERROR
            })
        }
        const respuesta = await productService.updateProduct(pid, prod)
        res.status(200).send({ message: respuesta.payload });
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: "400", message: `Error: ${error}` });
    }
}

const deleteProductController = async (req, res) => {
    try {
        let pid = req.params.pid
        let body = req.body
        if (pid) {
            await productService.deleteProduct(pid)

        } else
            await productService.deleteProduct(body)
        res.status(200).send({ message: "Producto eliminado con exito" });
    } catch (error) {
        res.status(400).send({ error: "400", message: "El id es invalido o no existe." });
    }

}
const viewProductsController = async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        let sort = req.query.sort;
        let query = req.query.query;
        let prods = await productService.getProducts(limit, page, sort, query)

        let data = { prods: prods, user: req.user }
        res.render(`products`, data)

    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error obteniendo productos" })
    }
}

const viewProductDetController = async (req, res) => {
    try {
        let pid = req.params.pid
        let user = req.user
        let prod = await productService.getProductsById(pid)
        let data = { user, prod }
        req.user ? res.render('productsDetail', data) : res.send('Debe estar loguado para ver este contenido')

    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando productos" })
    }
}

const getProductsFaker = async (req, res) => {
    try {
        let products = [];
        for (let i = 0; i < 100; i++) {
            products.push(generateProduct());
        }
        res.send({ status: "success", payload: products });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los productos:" });
    }
};

export { getProductsController, getProdIdController, postProductsController, putProdIdController, deleteProductController, viewProductsController, viewProductDetController, getProductsFaker }