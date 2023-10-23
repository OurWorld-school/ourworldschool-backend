// resultModel.js
const mongoose = require("mongoose");

const Nursery1resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    class: {
      type: String,
    },
    year: {
      type: String,
    },
    term: {
      type: String,
    },

    schoolRegNumber: {
      type: String,
    },
    English: [
      {
        test: {
          type: Number,
        },
        exam: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
      },
    ],
    Mathematics: [
      {
        test: {
          type: Number,
        },
        exam: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
      },
    ],
    SocialHabit: [
      {
        test: {
          type: Number,
        },
        exam: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
      },
    ],
    HealthScience: [
      {
        test: {
          type: Number,
        },
        exam: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
      },
    ],
    BasicScience: [
      {
        test: {
          type: Number,
        },
        exam: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
      },
    ],
    AgricScience: [
      {
        test: {
          type: Number,
        },
        exam: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
      },
    ],
    Rhymes: [
      {
        test: {
          type: Number,
        },
        exam: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
      },
    ],
    Writing: [
      {
        test: {
          type: Number,
        },
        exam: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
      },
    ],
    TotalScore: {
      type: Number,
    },
    TotalAverage: {
      type: String,
    },
    Position: {
      type: String,
    },
    Grade: {
      type: String,
    },
    Remark: {
      type: String,
    },
    Signature: {
      type: String,
    },
    // ScratchCardPin: {
    //   type: String,
    // },
    // ScratchCardPin: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true,
    },
    toObject: {
      virtual: true,
    },
  }
);

module.exports = mongoose.model("Nursery1result", Nursery1resultSchema);
