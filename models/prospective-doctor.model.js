const mongoose = require("mongoose");
const opts = { toJSON: { timestamps: true, virtuals: true } };

const prospectiveDoctorSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    specialty: String,
    notes: String,
    primaryPhone: String,
    primaryEmail: String,
    primaryFacilityId: String,

    createdBy: String,
    updatedBy: String,
  },
  opts
);

prospectiveDoctorSchema.virtual("id").get(function () {
  return this._id.toString();
});

prospectiveDoctorSchema.virtual("fullname").get(function () {
  return this.firstname + " " + this.lastname;
});

prospectiveDoctorSchema.virtual("primaryFacility", {
  ref: "Hospital",
  localField: "primaryFacilityId",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model(
  "ProspectiveDoctor",
  prospectiveDoctorSchema,
  "prospectiveDoctors"
);
