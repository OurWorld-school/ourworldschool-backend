// resultModel.js
const mongoose = require("mongoose");

const Nursery1resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    classes: {
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
        grade: {
          type: String,
        },
        remark: {
          type: String,
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
        grade: {
          type: String,
        },
        remark: {
          type: String,
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
        grade: {
          type: String,
        },
        remark: {
          type: String,
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
        grade: {
          type: String,
        },
        remark: {
          type: String,
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
        grade: {
          type: String,
        },
        remark: {
          type: String,
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
        grade: {
          type: String,
        },
        remark: {
          type: String,
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
        grade: {
          type: String,
        },
        remark: {
          type: String,
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
        grade: {
          type: String,
        },
        remark: {
          type: String,
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
    numberInClass: {
      type: Number,
    },
    TotalGrade: {
      type: String,
    },
    Remark: {
      type: String,
    },
    HmRemark: {
      type: String,
    },
    Signature: {
      type: String,
    },
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
