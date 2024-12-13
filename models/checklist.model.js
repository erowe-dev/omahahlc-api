const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const checklistSchema = new mongoose.Schema(
  {
    checklistItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChecklistItem",
      },
    ],
    createdBy: String,
  },
  opts
);

checklistSchema.virtual("id").get(function () {
  return this._id.toString();
});

module.exports = mongoose.model("Checklist", checklistSchema, "checklists");
