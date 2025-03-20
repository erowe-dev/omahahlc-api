const express = require("express");

module.exports = (db) => {
  if (!db) {
    throw new Error("Database connection not provided to routes");
  }

  const router = express.Router();
  const {
    upload,
    getFileIdsForEntity,
    saveFileToGridFS,
    streamFileForDisplay,
  } = require("../managers/file-manager")(db);

  router.get("/:type/:id", (req, res) => {
    getFileIdsForEntity(req.params, res);
  });

  router.get("/:fileId", (req, res) => {
    streamFileForDisplay(req.params.fileId, res);
  });

  router.post("/upload/:type/:id", upload.single("file"), saveFileToGridFS);

  return router;
};
