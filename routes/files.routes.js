const express = require("express");
const cache = require("../middleware/cache-helper");
const router = express.Router();
const {
  upload,
  deleteFile,
  getFileIdsForEntity,
  streamFileForDisplay,
} = require("../managers/file-manager");

router.get("/:type/:id", (req, res) => {
  getFileIdsForEntity(req.params, res);
});

router.get("/:fileId", cache(1800), (req, res) => {
  streamFileForDisplay(req.params.fileId, res);
});

router.post("/upload/:type/:id", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.status(200).json({
    message: "File uploaded",
    id: req.file.key,
    filename: req.file.filename,
  });
});

router.delete("/:id", (req, res) => {
  deleteFile(req.params.id, res);
});

module.exports = router;
