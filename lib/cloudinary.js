// npm installs
const cloudinary = require('cloudinary').v2;
const{ CloudinaryStorage } = require('multer-storage-cloudinary');


/** ----------------------------------------------------------------------------
 * 
 * Configure SDK with account credentials to authenticate Cloudinary account.
 * 
 * --------------------------------------------------------------------------- */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// allows Multer to upload files directly to Cloudinary.
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder:         'YelpCamp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

// Export both the configured cloudinary object and the storage engine.
module.exports = {
    cloudinary,
    storage
}