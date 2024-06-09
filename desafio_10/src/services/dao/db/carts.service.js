import { cartsModel } from "./models/carts.js"
import { productsModel } from "./models/products.js"
export default class CartService {
    constructor() {
        console.log('Working carts with database persistance in mongodb')
    }

    readCartFile = async () => {
        try {
            let carts = await cartsModel.find()
            return carts.map(cart => cart.toObject())
        }catch(error){
            console.error(`Error leyendo el carrito: ${error}`)
        }
    }

    createCart = async () => {
        try{
            let newCart = new cartsModel({})
            let result = await cartsModel.create(newCart)
            return result
        }catch(error){
            console.error(`Error creando el carrito: ${error}`)
        }
    }

    listCartProds = async (cartId) => {
        try{
            let result = await cartsModel.findById(cartId).populate('products.product').lean()
            return result
        }catch(error){
            console.error(`Error leyendo los productos del carrito: ${error}`)
            
        }
    }

    addToCart = async (cartId, prodId, email) => {
        try {
            let cartExists = await cartsModel.findById(cartId).populate('products.product')
            if (!cartExists) {
                throw new Error(`No existe el carrito`)
            }

            let product = await productsModel.findById(prodId);
            if (!product) {
                throw new Error(`No existe el producto`);
            }
            if (product.owner === email) {
                throw new Error('No puede agregar a su carrito un producto propio');
            }

            let prodExists = cartExists.products.find(
                prod => prod.product._id == prodId)

            if (prodExists) {
                prodExists.quantity++
            } else {
                cartExists.products.push({ product: prodId, quantity: 1 })
            }
            let result = await cartExists.save()
            return result
        } catch (error) {
            console.error(`Error agregando al carrito: ${error}`)
        }

    };

    deleteCart = async (cartId) => {
        try {
            let cartExists = await cartsModel.findById(cartId)
            if (!cartExists) {
                throw new Error(`No existe el carrito`)
            }
            let result = await cartsModel.deleteOne({ _id: cartId })
            return result
        } catch (error) {
            console.error(`Error eliminando el carrito: ${error}`)
        }
    }

    deleteProdFromCart = async (cartId, prodId) => {
        try {
            let cartExists = await cartsModel.findById(cartId)
            if (!cartExists) {
                throw new Error(`No existe el carrito`)
            }

            let prodExists = cartExists.products.find(
                prod => prod.product._id == prodId)
            if (!prodExists) {
                throw new Error(`No existe el producto en el carrito`)
            }

            let result = await cartsModel.updateOne(
                { _id: cartId },
                { $pull: { products: { product: prodId } } })
            return result
        } catch (error) {
            console.error(`Error eliminando del carrito: ${error}`)
        }

    }

    updateCartQty = async (cartId, prodId, qty) => {
        try {
            let cartExists = await cartsModel.findById(cartId)
            if (!cartExists) {
                throw new Error(`No existe el carrito`)
            }

            let prodExists = cartExists.products.find(
                prod => prod.product._id == prodId)
            if (!prodExists) {
                throw new Error(`No existe el producto en el carrito`)
            }
            if (isNaN(qty)) {
                throw new Error(`El valor enviado no es un numero`)
            }

            prodExists.quantity = parseInt(qty)
            let result = await cartExists.save()
            return result
        } catch (error) {
            console.error(`Error actualizando el carrito: ${error}`)
        }
    }

    updateCart = async (cartId) =>{
        try{
            let cartExists = await cartsModel.findById(cartId)
            if (!cartExists) {
                throw new Error(`No existe el carrito`)
            }
         
            let result = await cartsModel.findByIdAndUpdate(cartId, {}, { new: true }).populate('products.product').lean()

            return result
        } catch (error){
            console.error(`Error actualizando el carrito: ${error}`)
        }
    }
}
