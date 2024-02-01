const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const presentationSchema = new mongoose.Schema(
  {
    scheduledDate: Date,
    note: String,
    prospectiveDoctorId: String,
    hospitalId: String,
    assignedMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    createdBy: String,
    updatedBy: String,
  },
  opts
);

presentationSchema.virtual("id").get(function () {
  return this._id.toString();
});

module.exports = mongoose.model(
  "Presentation",
  presentationSchema,
  "presentations"
);
