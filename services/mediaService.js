const { Storage } = require("@google-cloud/storage");
const { nanoid } = require("nanoid");
const path = require("path");
require("dotenv").config();

const storage = new Storage({
  keyFilename: "./service.json",
  projectId: process.env.PROJECT_ID,
});

const bucketName = process.env.BUCKET_NAME;

exports.postMedia = async (buffer, originalname) => {
  console.log(originalname);
  try {
    const fileExtension = path.extname(originalname);
    const newFileName = `${Date.now()}-${nanoid(10)}${fileExtension}`;
    const folderName = "postMedia";
    const destination = `${folderName}/${newFileName}`;

    const file = storage.bucket(process.env.BUCKET_NAME).file(destination);

    // Upload buffer to Google Cloud Storage
    await file.save(buffer, {
      metadata: {
        contentType: `image/${fileExtension.slice(1)}`,
      },
    });

    const publicUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${destination}`;

    return { url: publicUrl, message: "Successfully uploaded file" };
  } catch (error) {
    return { message: "Failed to upload file", error: error.message };
  }
};

exports.articleMedia = async (buffer, originalname) => {
  console.log(originalname);
  try {
    const fileExtension = path.extname(originalname);
    const newFileName = `${Date.now()}-${nanoid(10)}${fileExtension}`;
    const folderName = "articleMedia";
    const destination = `${folderName}/${newFileName}`;

    const file = storage.bucket(process.env.BUCKET_NAME).file(destination);

    // Upload buffer to Google Cloud Storage
    await file.save(buffer, {
      metadata: {
        contentType: `image/${fileExtension.slice(1)}`,
      },
    });

    const publicUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${destination}`;

    return { url: publicUrl, message: "Successfully uploaded file" };
  } catch (error) {
    return { message: "Failed to upload file", error: error.message };
  }
};

exports.deleteImage = async (newFilename) => {
  try {
    const file = bucketName.file(newFilename);
    await file.delete();
    console.log(file)
    return { message: 'Image successfully deleted' };
  } catch (error) {
    return { message: 'Failed to delete image', error: error.message };
  }
};