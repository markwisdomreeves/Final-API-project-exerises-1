const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: Array,
        default: 'https://www.upsieutoc.com/images/2020/07/18/img1.jpg'
    },
    description: String,
    content: String,
    colors: Array,
    sizes: Array,
    price: {
        type: Number,
        required: true
    }

});



module.exports = mongoose.model('products', productSchema)