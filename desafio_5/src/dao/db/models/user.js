import mongoose from 'mongoose';

const collection = 'users';

const strTypeSchemeUniqueRequired = {
    type: String,
    unique: true,
    required: true
}
const strTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};
const schema = new mongoose.Schema({
    firstName: strTypeSchemaNonUniqueRequired,
    lastName: strTypeSchemaNonUniqueRequired,
    email: strTypeSchemeUniqueRequired,
    age: Number,
    password: strTypeSchemaNonUniqueRequired
})

const userModel = mongoose.model(collection, schema);
export default userModel;