const cloudinary = require("../configs/cloudinary");
const multer = require("multer");

const storage = new multer.memoryStorage();

async function imageUpload(file) {

    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    })
    console.log(result);
    return result;

}

//delete functionality
async function imageDelete(public_id) {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
}


const upload = multer({ storage });

module.exports = { upload, imageUpload, imageDelete }