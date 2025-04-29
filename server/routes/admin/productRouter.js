const express = require("express");
const { handleImageUpload, addProduct, editProduct, deleteProduct, fetchProducts } = require("../../controllers/admin/productsController");
const { upload } = require("../../helpers/file-upload");

const router = express.Router();

router.post("/upload", upload.single("product_image"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchProducts);


module.exports = router;