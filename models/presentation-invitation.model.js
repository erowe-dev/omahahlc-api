const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const presentationInvitationSchema = new mongoose.Schema(
  {
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    contactedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dateContacted: Date,
    departments: [
      {
        type: String,
      },
    ],

    followUpDate: {
      type: Date,
      default: Date.now() + 14,
    },

    methodOfContact: {
      type: String,
      enum: ["phone", "email", "text", "in-person"],
      default: "phone",
    },

    notes: String,

    offeredCME: {
      type: Boolean,
      default: false,
    },

    response: {
      type: String,
      enum: ["accepted", "declined", "pending"],
      default: "pending",
    },

    scheduled: {
      type: Boolean,
      default: false,
    },

    createdBy: String,
    updatedBy: String,
  },
  opts
);

presentationInvitationSchema.virtual("id").get(function () {
  return this._id.toString();
});

presentationInvitationSchema.virtual("contact", {
  ref: "PresentationContact",
  localField: "contactId",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model(
  "PresentationInvitation",
  presentationInvitationSchema,
  "presentationInvitations"
);
