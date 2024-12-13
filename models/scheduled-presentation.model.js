const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true }, timestamps: true };

const scheduledPresentationSchema = new mongoose.Schema(
  {
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PresentationContact",
    },
    scheduledDateTime: Date,
    assignedPresenters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    offeredCME: {
      type: Boolean,
      default: false,
    },
    expectedAttendees: Number,
    followUpDate: {
      type: Date,
      default: Date.now() + 7,
    },

    presentationChecklist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Checklist",
    },

    createdBy: String,
    updatedBy: String,
  },
  opts
);

scheduledPresentationSchema.virtual("id").get(function () {
  return this._id.toString();
});

module.exports = mongoose.model(
  "ScheduledPresentation",
  scheduledPresentationSchema,
  "scheduledPresentations"
);
