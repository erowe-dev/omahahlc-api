const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const checklistItemSchema = new mongoose.Schema(
  {
    description: String,
    type: {
      type: String,
      enum: ["scheduledPresentation", "other"],
      default: "scheduledPresentation",
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
