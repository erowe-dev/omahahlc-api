const mongoose = require("mongoose");

const specialtySchema = new mongoose.Schema({
  name: String,
  numberOfCooperativeDoctors: Number,
  numberOfProspectiveDoctors: Number,
});

specialtySchema.virtual("id").get(function () {
  return this._id.toString();
});

module.exports = mongoose.model("Specialties", specialtySchema, "specialties");
