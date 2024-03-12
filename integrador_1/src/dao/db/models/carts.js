import mongoose from 'mongoose';
import { productsModel } from './products.js';

const collectionName = 'carts';


const cartsSchema = new mongoose.Schema({

    products: {
        type:[{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref:productsModel},
            quantity: {
                type: Number,
                default: 0
            }
        }],
        default: []
    }

})

export const cartsModel = mongoose.model(collectionName, cartsSchema)