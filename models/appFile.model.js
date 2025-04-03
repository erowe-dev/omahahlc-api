const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const appFileSchema = new mongoose.Schema(
  {
    fileId: String,
    entityType: String,
    entityId: mongoose.Schema.Types.ObjectId,
    filename: String,
  },
  opts
);

appFileSchema.virtual("id").get(function () {
  return this._id.toString();
});

module.exports = mongoose.model("AppFile", appFileSchema, "appFiles");
