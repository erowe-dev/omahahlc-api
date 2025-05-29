const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const opts = { toJSON: { virtuals: true } };
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    
    name: {
      type: String,
    },
    role: {
      type: String,
      enum: [
        "admin",
        "helperAdmin",
        "cooperativeDoctorCoordinator",
        "member",
        "helper",
        "pvg",
      ],
      default: "member",
    },
    phone: {
      type: String,
    },
  },
  opts
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.password) {
    return next();
  }

  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

userSchema.virtual("id").get(function () {
  return this._id.toString();
});

const UserModel = mongoose.model("User", userSchema, "users");

module.exports = UserModel;
