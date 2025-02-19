const mongoose = require("mongoose");
const presentationInvitationModel = require("./presentation-invitation.model");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const presentationContactSchema = new mongoose.Schema(
  {
    contactName: String,
    contactTitle: String,
    contactPhone: String,
    contactEmail: String,
    notes: String,

    facility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },

    createdBy: String,
    updatedBy: String,
  },
  opts
);

presentationContactSchema.virtual("id").get(function () {
  return this._id.toString();
});

// presentationSchema.virtual("hospital", {
//   ref: "Hospital",
//   localField: "hospitalId",
//   foreignField: "_id",
//   justOne: true,
// });

module.exports = mongoose.model(
  "PresentationContact",
  presentationContactSchema,
  "presentationContacts"
);
