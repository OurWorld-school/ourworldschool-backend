// resultModel.js
const mongoose = require("mongoose");

const Basic4resultSchema = new mongoose.Schema(
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
    VerbalReasoning: [
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
    QuantitativeReasoning: [
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
    NationalValues: [
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
    CRK: [
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
    CreativeArt: [
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
    History: [
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
    Phonics: [
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
    French: [
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
    Igbo: [
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
    PVC: [
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
    Computer: [
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

module.exports = mongoose.model("Basic4result", Basic4resultSchema);
