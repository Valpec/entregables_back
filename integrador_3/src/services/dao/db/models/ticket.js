// Id (autogenerado por mongo)
// code: String debe autogenerarse y ser único
// purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
// amount: Number, total de la compra.
// purchaser: String, contendrá el correo del usuario asociado al carrito.
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const collectionName = 'tickets';
const strTypeSchemeUniqueRequired = {
    type: String,
    unique: true,
    required: true
}

const strTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const ticketsSchema = new mongoose.Schema({
    code: strTypeSchemeUniqueRequired,  //hacer ocn uuid
    purchase_datetime: strTypeSchemaNonUniqueRequired, //hacer logica con el new Date
    amount: {
        type: Number,
        required: true
    }, // sumar el total de todos los productos
    purchaser: strTypeSchemaNonUniqueRequired   //asociarle el email de la persona
})

// ticketsSchema.plugin(mongoosePaginate);

export const ticketsModel = mongoose.model(collectionName, ticketsSchema)