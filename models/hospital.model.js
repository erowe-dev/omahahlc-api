const mongoose = require("mongoose");
const opts = { toJSON: { timestamps: true, virtuals: true } };

const hospitalSchema = new mongoose.Schema({
    hospitalName: String,
    healthCareSystem: String,
    cms: String,
    hospitalType: {
        type: String,
        enum: ["Acute Care Hospital", "Childrens", "Critical Access Hospital", "General"],
        default: "General",
    },
    emergencyServices: Boolean,
    traumaCenter: Boolean,
    beds: Number,
    address: String,
    city: String,
    state: String,
    zip: String,
    telephone: String,

    createdBy: String,
    updatedBy: String,
}, opts);

hospitalSchema.virtual('id').get(function() {
    return this._id.toString();
})

module.exports = mongoose.model("Hospital", hospitalSchema, "hospitals");