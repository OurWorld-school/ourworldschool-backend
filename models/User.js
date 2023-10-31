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
    nursery1result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Nursery1result" },
    ],
    ScratchCard: [
      {
        ScratchCardPin: {
          type: String,
        },
        ScratchCardPassword: {
          type: String,
        },
        usageCount: { type: Number, default: 0 },
        isValid: { type: Boolean, default: true },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
