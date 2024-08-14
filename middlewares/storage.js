const { Storage } = require('@google-cloud/storage');
require('dotenv').config();
const { nanoid } = require("nanoid");
const path = require('path');
const pathKey = path.resolve('./service.json');

const { BUCKET_NAME, PROJECT_ID } = process.env;

const cloudStorage = new Storage({
    projectId: PROJECT_ID,
    keyFilename: pathKey
})

const bucket = cloudStorage.bucket(BUCKET_NAME);

function getImgUrl(filename) {
    return 'https://storage.googleapis.com/' + BUCKET_NAME + '/' + filename;
}

exports.uploadProfileImgToCloudStorage = (req, res, next) => {

    if (!req.file) {
        res.status(400).json({
            status: false,
            message: "Please upload an image.",
        });
    };

    const uploadedFileName = `usersProfileImage/${nanoid(8)}`;
    const uploadedFile = bucket.file(uploadedFileName)

    const stream = uploadedFile.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })

    stream.on('finish', () => {
        req.file.cloudStorageObject = uploadedFileName
        req.file.cloudStoragePublicUrl = getImgUrl(uploadedFileName)
        next()
    })

    stream.end(req.file.buffer)
}

exports.uploadArticleImgToCloudStorage = (req, res, next) => {

    if (!req.file) return next()

    const uploadedFileName = `articleImage/${nanoid(8)}`;
    const uploadedFile = bucket.file(uploadedFileName)

    const stream = uploadedFile.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })

    stream.on('finish', () => {
        req.file.cloudStorageObject = uploadedFileName
        req.file.cloudStoragePublicUrl = getImgUrl(uploadedFileName)
        next()
        // res.send(req.file.cloudStoragePublicUrl)
    })

    stream.end(req.file.buffer)
}