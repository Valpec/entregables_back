import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

cartsSchema.pre('find', function(){
    this.populate(products.product)
})
cartsSchema.plugin(mongoosePaginate)

export const cartsModel = mongoose.model(collectionName, cartsSchema)