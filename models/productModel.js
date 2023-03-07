import mongoose from "mongoose";

const productSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true

    },
    photo: {
        data: Buffer,
        contentType:String,
    },
    slug:{
        type: String,
        required: true,
        unique: true
    }
   
},{timestamps: true});
export default mongoose.model('Products', productSchema)