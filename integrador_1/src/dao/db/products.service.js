import { productsModel } from "./models/products.js";

export default class ProductService {
    constructor() {
        console.log('Working products with database persistance in mongodb')
    } 

    getProducts = async () =>{
        let products = await productsModel.find()
        return products.map(product => product.toObject())
    }

    addProduct = async (product) => {
        let result =await productsModel.create(product)
        return result
    }

    deleteProduct = async (itemId) => {
        let result = await productsModel.deleteOne({_id:itemId})
        return result
    }

    updateProduct = async(product) =>{
        let result = await productsModel.updateOne({_id: product.id}, product)
        return result
    }

    getProductsById = async(itemId) =>{
        let result = await productsModel.findOne({_id:itemId})
        return result
    }
}
