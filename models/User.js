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

    passportPhoto: {
      type: String,
    },
    email: {
      type: String,
      required: true,

      unique: true,
    },
    currentClass: {
      type: String,
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
    roles: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    deactivateUserRole: {
      type: Boolean,
      default: false,
    },
    userType: { type: String, default: "Student" },

    deactivateUserRole: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      // required: true,
      min: 6,
      max: 12,
    },
    prenurseryresult: [
      { type: mongoose.Schema.Types.ObjectId, ref: "PresNurseryResult" },
    ],
    nursery1result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Nursery1result" },
    ],
    nursery2result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Nursery2result" },
    ],
    nursery3result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Nursery3result" },
    ],
    basic1result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Basic1result" },
    ],
    basic2result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Basic2result" },
    ],
    basic3result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Basic3result" },
    ],
    basic4result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Basic4result" },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
