const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const checklistSchema = new mongoose.Schema(
  {
    items: [
      {
        description: String,
        completed: {
          type: Boolean,
          default: false,
        },
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
