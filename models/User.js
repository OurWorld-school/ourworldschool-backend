const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    schoolRegNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,

      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    contactAdress: {
      type: String,
      required: true,
      max: 100,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    deactivateUserRole: {
      type: Boolean,
      default: false,
    },
    roles: { type: String, default: "Student" },
    deactivateUserRole: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 12,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
