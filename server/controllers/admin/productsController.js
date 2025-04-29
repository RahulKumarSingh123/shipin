const { imageUpload, imageDelete } = require("../../helpers/file-upload");
const Product = require('../../models/productSchema');

const handleImageUpload = async(req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUpload(url);
        res.status(200).json({
            success: true,
            message: "Uploaded successfully",
            result: result || 1
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Image Upload Failed"
        })
    }
}

//add product
const addProduct = async(req, res) => {
    try {
        const data = req.body;
        const newProduct = await Product.create({
            title: data.title,
            description: data.description,
            category: data.category,
            brand: data.brand,
            price: data.price,
            salePrice: data.salePrice,
            totalStock: data.totalStock,
            image_url: data.image_url,
            image_public_id: data.image_public_id,
        })
        if (newProduct) {
            res.status(201).json({
                success: true,
                message: "Product added!",
                data: newProduct,
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Product not added.Try again"
            })
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//fetch all products
const fetchProducts = async(req, res) => {
    try {
        const products = await Product.find();
        if (products) {
            res.status(200).json({
                success: true,
                message: "Products fetched",
                data: products,
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Unable to fetch products"
            })
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//edit product
const editProduct = async(req, res) => {
    try {
        console.log("Edit")
        const id = req.params.id;
        const data = await req.body;
        console.log(id);
        console.log(data);
        const updatedProduct = await Product.findByIdAndUpdate(id, {...data });
        console.log(updatedProduct);
        if (updatedProduct) {
            res.status(200).json({
                success: true,
                message: "Details Edited",
                data: updatedProduct
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Edit failed.Try again"
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//delete product
const deleteProduct = async(req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (deletedProduct) {
            const deletedImage = await imageDelete(deletedProduct.image_public_id);
            console.log(deletedImage);
            res.status(200).json({
                success: true,
                message: "Product deleted!",
                data: deletedProduct
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Unable to delete.Try again"
            })
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}



module.exports = { handleImageUpload, addProduct, fetchProducts, deleteProduct, editProduct };