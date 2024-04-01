import mongoose from 'mongoose';

const collection = 'users';

const strTypeSchemeUnique = {
    type: String,
    unique: true,
}
const strTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};
const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: strTypeSchemeUnique,
    age: Number,
    password: String,
    loggedBy: String
})

const userModel = mongoose.model(collection, schema);
export default userModel;