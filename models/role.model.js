const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  opts
);

roleSchema.virtual("id").get(function () {
  return this._id.toString();
});

module.exports = mongoose.model("Role", roleSchema);
