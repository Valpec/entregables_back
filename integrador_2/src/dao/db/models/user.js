import mongoose from 'mongoose';
import { cartsModel } from './carts.js';

const collection = 'users';

const strTypeSchemeUnique = {
    type: String,
    unique: true,
}
const strTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: strTypeSchemeUnique,
    age: Number,
    password: String, //Hashear
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: cartsModel,
        default: '65f6e85d9ee742a71efd9ff9'
    },
    role: {
        type: String,
        default: 'user'
    },
    loggedBy: String 
    // dejar????? ^^^^^^^
})

userSchema.pre('find', function(){
    this.populate(cart)
})

const userModel = mongoose.model(collection, userSchema);
export default userModel;