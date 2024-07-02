import mongoose from 'mongoose';
import { cartsModel } from './carts.js';

const collection = 'users';

const strTypeSchemeUnique = {
    type: String,
    unique: true,
}
const strTypeSchemaNonUniqueRequired = {
    type: String,
    required: false
};
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: strTypeSchemeUnique,
    age: Number,
    password: String, //Hashear
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: cartsModel
    },
    role: {
        type: String,
        default: 'user'
    },
    loggedBy: String,
    documents: {
        type:[{
            name: {
                type: strTypeSchemaNonUniqueRequired
            },
            reference: {
                type: strTypeSchemaNonUniqueRequired
            }
        }]
    },
    last_connection: strTypeSchemaNonUniqueRequired
})

userSchema.pre('find', function(){
    this.populate(cart)
})

const userModel = mongoose.model(collection, userSchema);
export default userModel;