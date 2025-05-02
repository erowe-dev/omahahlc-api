const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const specialtySchema = new mongoose.Schema(
  {
    name: String,
    numberOfCooperativeDoctors: Number,
    numberOfProspectiveDoctors: Number,
    includeInStatistics: { type: Boolean, default: true },
  },
  opts
);

specialtySchema.virtual("id").get(function () {
  return this._id.toString();
});

module.exports = mongoose.model("Specialty", specialtySchema, "specialties");
