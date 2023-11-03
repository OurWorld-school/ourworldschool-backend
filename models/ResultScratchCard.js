const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const ResultScratchCardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    pin: { type: String },
    serialNo: { tpype: String },
    usageCount: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("ResultScratchCard", ResultScratchCardSchema);
