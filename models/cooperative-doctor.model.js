const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const cooperativeDoctorSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    consulting: Boolean,
    primarySpecialty: String,
    otherSpecialties: String,
    notes: String,
    primaryPhone: String,
    primaryEmail: String,
    primaryFacilityId: String,

    otherFacilities: {
      type: [
        {
          id: String,
          name: String,
        },
      ],
    },

    createdBy: String,
    updatedBy: String,
  },
  opts
);

cooperativeDoctorSchema.virtual("id").get(function () {
  return this._id.toString();
});

cooperativeDoctorSchema.virtual("fullname").get(function () {
  return this.firstname + " " + this.lastname;
});

cooperativeDoctorSchema.virtual("primaryFacility", {
  ref: "Hospital",
  localField: "primaryFacilityId",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model(
  "CooperativeDoctor",
  cooperativeDoctorSchema,
  "cooperativeDoctors"
);
