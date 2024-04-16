import { productsModel } from "./models/products.js";

export default class ProductService {
    constructor() {
        console.log('Working products with database persistance in mongodb')
    }

    getProducts = async (limit, page, sort, query) => {

        try {
            if (!limit) limit = 10
            if (!page) page = 1
            let options = { limit: limit, page, lean: true }

            if (sort) {
                options.sort = { price: sort }
            }

            let queryObj = {}
            if (query) {
                if (query === "disponible"){
                    queryObj = { status: true };
                }else{
                    queryObj = {category: query}
                }
            }
            let result = await productsModel.paginate( queryObj, options)
            
            result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}${limit ? `&limit=${limit}` : ''}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : '';
            result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}${limit ? `&limit=${limit}` : ''}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : '';

            result.isValid = !(page < 1 || page > result.totalPages)
            return result
            
        } catch (error) {
            console.error(`Error leyendo los productos: ${error}`)

        }

    }

    addProduct = async (product) => {
        try {
            let result = await productsModel.create(product)
            return result
        } catch (error) {
            console.error(`Error agregando el producto: ${error}`)
        }
    }

    deleteProduct = async (itemId) => {
        try {
            let result = await productsModel.deleteOne({ _id: itemId })
            return result
        } catch (error) {
            console.error(`Error eliminando el producto: ${error}`)
        }
    }

    updateProduct = async (prodId, product) => {
        try {
            let result = await productsModel.updateOne({ _id: prodId }, product)
            console.log(result)
            return result

        } catch (error) {
            console.error(`Error en la actualizacion del producto: ${error}`)
            res.status(500)
        }

    }

    getProductsById = async (itemId) => {
        try {
            let result = await productsModel.findOne({ _id: itemId }).lean();
            return result
        } catch (error) {
            console.error(`Error leyendo el producto: ${error}`)

        }
    }

    sortProducts = async (itemId) => {
        try {

        } catch (error) {
            console.error(`Error ordenando los productos: ${error}`)

        }
    }
}
