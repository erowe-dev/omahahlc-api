const multer = require("multer");
const { GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");
const stream = require("stream");

module.exports = function (db) {
  if (!db) {
    throw new Error("MongoDB connection is required");
  }

  const bucket = new GridFSBucket(db, {
    bucketName: "uploads",
  });

  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  const getFileIdsForEntity = async (params, res) => {
    const query = { [`metadata.${params.type}`]: params.id };

    const cursor = bucket.find(query);
    const fileIds = [];
    for await (const file of cursor) {
      fileIds.push(file._id);
    }

    res.status(200).json(fileIds);
  };

  const streamFileForDisplay = async (fileId, res) => {
    const objectId = new mongoose.Types.ObjectId(fileId); // Convert fileId to ObjectId

    const downloadStream = bucket.openDownloadStream(objectId);

    downloadStream.on("error", (err) => {
      console.error("Error reading file from GridFS:", err);
      res
        .status(500)
        .json({ error: "Error reading file", details: err.message });
    });

    downloadStream.on("end", () => {
      console.log("File read completed.");
    });

    const fileMetadata = bucket.find({ _id: objectId }).next();

    fileMetadata.then((file) => {
      res.setHeader(
        "Content-Type",
        file.contentType || "application/octet-stream"
      );

      res.setHeader("cache-control", "public, max-age=86400");

      downloadStream.pipe(res);
    });
  };

  const saveFileToGridFS = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const readableStream = new stream.PassThrough();
    readableStream.end(req.file.buffer);

    const uploadStream = bucket.openUploadStream(
      `${Date.now()}-${req.file.originalname}`,
      {
        metadata: {
          contentType: req.file.mimetype,
          [req.params.type]: req.params.id || null,
        },
      }
    );

    readableStream
      .pipe(uploadStream)
      .on("finish", () =>
        res
          .status(200)
          .json({ message: "File uploaded", fileId: uploadStream.id })
      )
      .on("error", (err) => {
        console.error("GridFS Upload Error:", err);
        res.status(500).json({ error: "File upload failed" });
      });
  };

  return {
    upload,
    getFileIdsForEntity,
    streamFileForDisplay,
    saveFileToGridFS,
  };
};
