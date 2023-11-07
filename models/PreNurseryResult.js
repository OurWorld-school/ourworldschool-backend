// resultModel.js
const mongoose = require("mongoose");

const PreNurseryResultSchema = new mongoose.Schema(
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
    Numeracy: [
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
    Literacy: [
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
    Colouring: [
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
    HealthHabit: [
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
    PreScience: [
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
    PracticalLife: [
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
    SensorialActivity: [
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

module.exports = mongoose.model("PreNurseryResult", PreNurseryResultSchema);
