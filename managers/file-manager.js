const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3 } = require("@aws-sdk/client-s3");
const mongoose = require("mongoose");
const path = require("path");
const appFile = require("../models/appFile.model");

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

const bucketName = process.env.S3_BUCKET_NAME;

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      const metadata = { fieldName: file.fieldname };
      cb(null, metadata);
    },
    key: (req, file, cb) => {
      const fileMetadata = {
        entityType: req.params.type,
        entityId: req.params.id,
        filename: file.originalname,
        metadata: { fieldName: file.fieldname },
      };

      const newFile = new appFile(fileMetadata);

      newFile.save();

      cb(null, newFile.id);
    },
  }),
});

const deleteFile = async (id, res) => {
  try {
    await appFile.findByIdAndDelete(id);

    await s3.deleteObject({ Bucket: bucketName, Key: id });
    res.status(204).send();
  } catch (e) {
    console.error("S3 Delete Error:", e);
    res.status(500).json({ error: "File deletion failed" });
  }
};

const getFileIdsForEntity = async (params, res) => {
  try {
    const { type, id } = params;

    const query = {
      entityType: type,
      entityId: new mongoose.Types.ObjectId(id),
    };

    const files = await appFile.find(query);

    res.status(200).json(files);
  } catch (e) {
    console.error("S3 List Error:", e);
    res.status(500).json({ error: "Failed to retrieve file list" });
  }
};

const streamFileForDisplay = async (fileId, res) => {
  try {
    console.log(fileId)
    const fileStream = await s3.getObject({
      Bucket: bucketName,
      Key: fileId,
    });
    res.setHeader(
      "Content-Type",
      fileStream.ContentType || "application/octet-stream"
    );
    res.setHeader(
      "Content-Disposition",
      `inline; filename=\"${path.basename(fileId)}\"`
    );

    fileStream.Body.pipe(res);
  } catch (e) {
    console.error("S3 Read Error:", e);
    res.status(500).json({ error: "Failed to stream file" });
  }
};

module.exports = {
  upload,
  deleteFile,
  getFileIdsForEntity,
  streamFileForDisplay,
};
