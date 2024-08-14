// const { GridFsStorage } = require('multer-gridfs-storage');
// const multer = require('multer');
// require("dotenv").config();

// const { DATABASE_URL } = process.env;

// // GridFS Storage configuration for user images
// const storage = new GridFsStorage({
//     url: DATABASE_URL,
//     file: (req, file) => {
//         return {
//             filename: `${req.params.id}.${file.originalname.split('.').pop()}`,  // Use user ID as filename
//             bucketName: 'userImages',  // Bucket name for user profile images
//         };
//     },
// });

// const uploadUserImage = multer({ storage });

// module.exports = uploadUserImage;