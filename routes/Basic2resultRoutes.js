const Basic1result = require("../models/Basic1result");
const Basic2result = require("../models/Basic2result");
const Nursery1result = require("../models/Nursery1result");

const User = require("../models/User");

const router = require("express").Router();
router.post("/", async (req, res) => {
  const userId = req.body.user;
  const {
    English,
    Mathematics,
    History,
    CRK,
    VerbalReasoning,
    QuantitativeReasoning,
    BasicScience,
    Phonics,
    French,
    Computer,
    NationalValues,
    PVC,
    year,
    term,
    classes,
    CreativeArt,
    Igbo,
  } = req.body; // Assuming the request body contains the Biology data as an array of test and exam objects

  // const modifyClass = class.replace(/\s+/g, "-");
  // Calculate the total score for each entry in the Biology array
  const EnglishresultsWithTotal = English.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const MathsresultsWithTotal = Mathematics.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const NationalValuesresultsWithTotal = NationalValues.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const CRKresultsWithTotal = CRK.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const VerbalReasoningresultsWithTotal = VerbalReasoning.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const QuantitativeReasoningsultsWithTotal = QuantitativeReasoning.map(
    (item) => ({
      test: item.test,
      exam: item.exam,
      totalScore: item.totalScore,
      grade: item.grade,
      remark: item.remark,
    })
  );
  const BasicScienceresultsWithTotal = BasicScience.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const HistoryresultsWithTotal = History.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const PhonicsresultsWithTotal = Phonics.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const FrenchresultsWithTotal = French.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const PVCresultsWithTotal = PVC.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const CreativeArtresultsWithTotal = CreativeArt.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const IgboresultsWithTotal = Igbo.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const ComputerresultsWithTotal = Computer.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  // const grandTotal = English.totalScore + Mathematics.totalScore;

  try {
    const ResultAlreadyExits = await Basic2result.findOne({
      userId,
      year,
      term,
      classes,
    });

    if (ResultAlreadyExits) {
      return res.status(404).json({ message: "User Result already Exits" });
    }

    // Create a new result document in the database with the Biology array containing total scores
    const newResult = new Basic2result({
      English: EnglishresultsWithTotal,
      Mathematics: MathsresultsWithTotal,
      BasicScience: BasicScienceresultsWithTotal,
      History: HistoryresultsWithTotal,
      CRK: CRKresultsWithTotal,
      VerbalReasoning: VerbalReasoningresultsWithTotal,
      NationalValues: NationalValuesresultsWithTotal,
      QuantitativeReasoning: QuantitativeReasoningsultsWithTotal,
      CreativeArt: CreativeArtresultsWithTotal,
      Phonics: PhonicsresultsWithTotal,
      Igbo: IgboresultsWithTotal,
      French: FrenchresultsWithTotal,
      Computer: ComputerresultsWithTotal,
      PVC: PVCresultsWithTotal,
      user: userId,
      classes: classes,
      year: year,
      term: term,
      schoolRegNumber: req.body.schoolRegNumber,
      TotalScore: req.body.TotalScore,
      TotalAverage: req.body.TotalAverage,
      Position: req.body.Position,
      numberInClass: req.body.numberInClass,
      Remark: req.body.Remark,
      HmRemark: req.body.HmRemark,
      TotalGrade: req.body.TotalGrade,
      Signature: req.body.Signature,
    });
    await newResult.save();
    // Update the user's document with the new result ID

    await User.findByIdAndUpdate(userId, {
      $push: { basic2result: newResult._id },
    });
    return res.status(201).json(newResult);
  } catch (error) {
    return res.status(500).json({ error: "Failed to save the result." });
  }
});
router.get("/", async (req, res) => {
  try {
    const basic2results = await Basic2result.find({})
      .sort({ createdAt: -1 })
      .populate("user", [
        "firstName",
        "lastName",
        "passportPhoto",
        "schoolRegNumber",
      ]);

    res.json(basic2results);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const basic2result = await Basic2result.findById(req.params.id).populate(
      "user",
      ["firstName", "lastName", "passportPhoto", "schoolRegNumber"]
    );
    res.status(200).json(basic2result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/results/:user/:year/:term/", async (req, res) => {
  try {
    const { user, year, term } = req.params;

    // Use the parameters to query the database
    const basic2result = await Basic2result.findOne({
      user,
      year,

      term,
    }).populate("user", [
      "firstName",
      "lastName",
      "passportPhoto",
      "schoolRegNumber",
    ]);

    if (!basic2result) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Return the result as JSON
    res.json(basic2result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/update/:id", async (req, res) => {
  const {
    English,
    // Mathematics,
    // SocialHabit,
    // HealthScience,
    // BasicScience,
    // AgricScience,
    // Rhymes,
    // Writing,
  } = req.body; // Assuming the request body contains the Biology data as an array of test and exam objects

  // Calculate the total score for each entry in the Biology array
  const EnglishresultsWithTotal = English.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
  }));
  // const { image } = req.body;
  try {
    const nursery1result = await Nursery1result.findById(req.params.id);

    nursery1result.English = EnglishresultsWithTotal || nursery1result.English;

    const updatedResult = await nursery1result.save();

    res.status(200).json({
      _id: updatedUser._id,
      English: updatedResult.English,
    });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
module.exports = router;
