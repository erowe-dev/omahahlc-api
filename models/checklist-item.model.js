const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const checklistItemSchema = new mongoose.Schema(
  {
    key: String,
    value: Boolean,
    type: {
      type: String,
      enum: ["scheduledPresentation", "other"],
      default: "other",
    },
  },
  opts
);

checklistItemSchema.virtual("id").get(function () {
  return this._id.toString();
});

module.exports = mongoose.model(
  "ChecklistItem",
  checklistItemSchema,
  "checklistItems"
);
