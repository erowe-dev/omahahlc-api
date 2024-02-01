const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const noteSchema = new mongoose.Schema(
  {
    text: String,
    cooperativeDoctorId: String,
    prospectiveDoctorId: String,
    facilityId: String,
    noteType: {
      type: String,
      enum: ["note", "interaction"],
      default: "note",
    },
    contactMethod: {
      type: String,
      enum: ["phone", "email", "text", "in-person", "none"],
      default: "phone",
    },

    createdBy: String,
    updatedBy: String,
  },
  opts
);

noteSchema.virtual("id").get(function () {
  return this._id.toString();
});

module.exports = mongoose.model("Note", noteSchema, "notes");
