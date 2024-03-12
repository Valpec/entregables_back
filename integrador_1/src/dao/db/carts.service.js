import { cartsModel } from "./models/carts.js"

export default class CartService {
    constructor() {
        console.log('Working carts with database persistance in mongodb')
    } 

    readCartFile = async () =>{
        let carts = await cartsModel.find()
        return carts.map(cart => cart.toObject())
    }

    createCart = async () => {
        let newCart = new cartsModel({}) 
        let result = await newCart.save()
        console.log(`lo crea`)
        return result
    }

    listCartProds = async(cartId) =>{
        let result = await cartsModel.findOne({_id:cartId})
        return result
    }

    addToCart = async(cartId, prodId)=>{

        const updateQuantityQuery = {
            $inc: { "products.$.quantity": 1 } 
        };
        const filter = {
            _id: cartId,
            "products.product": prodId
        }
        
        let result = await cartsModel.updateOne(filter, updateQuantityQuery)

        if (result.matchedCount === 0) {
            const newProduct = {
                product: prodId,
                quantity: 1 
            }
        
            const addProductQuery = {
                $push: { products: newProduct } 
            }
        
            result = await cartsModel.updateOne({ _id: cartId }, addProductQuery);
        }

        return result
      
    };
    
}
