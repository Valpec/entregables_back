import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const collectionName = 'products';
const strTypeSchemeUniqueRequired = {
    type: String,
    unique: true,
    required: true
}

const strTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const productsSchema = new mongoose.Schema({
    title: strTypeSchemaNonUniqueRequired,
    description: strTypeSchemaNonUniqueRequired,
    code: strTypeSchemeUniqueRequired,
    price: Number,
    status: Boolean,
    stock: Number,
    category: strTypeSchemaNonUniqueRequired,
    thumbnail: strTypeSchemaNonUniqueRequired,
    owner: { 
       type: String,
        default: 'admin'
    }
})

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(collectionName, productsSchema)