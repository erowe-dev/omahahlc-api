const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const completedPresentationSchema = new mongoose.Schema(
  {
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    completedDate: Date,
    presenters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    attendees: [
      {
        type: String,
      },
    ],
    offeredCME: {
      type: Boolean,
      default: false,
    },
    addedCMEToExcelTracker: {
      type: Boolean,
      default: false,
    },
    actualAttendance: Number,
    followedUp: {
      type: Boolean,
      default: false,
    },
    followUpDate: {
      type: Date,
      default: Date.now() + 7,
    },
    notes: String,

    createdBy: String,
    updatedBy: String,
  },
  opts
);

completedPresentationSchema.virtual("id").get(function () {
  return this._id.toString();
});

completedPresentationSchema.virtual("contact", {
  ref: "PresentationContact",
  localField: "contactId",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model(
  "CompletedPresentation",
  completedPresentationSchema,
  "completedPresentations"
);
