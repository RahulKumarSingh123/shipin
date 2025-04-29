const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
    },
    salePrice: {
        type: Number,
    },
    totalStock: {
        type: Number,
    },
    image_url: {
        type: String,
    },
    image_public_id: {
        type: String,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);