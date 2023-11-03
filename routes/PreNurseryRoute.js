const Nursery1result = require("../models/Nursery1result");
const PreNurseryResult = require("../models/PreNurseryResult");
const User = require("../models/User");

const router = require("express").Router();
router.post("/", async (req, res) => {
  const userId = req.body.user;
  const {
    Numeracy,
    Literacy,
    Colouring,
    HealthHabit,
    PreScience,
    PracticalLife,
    Rhymes,
    year,
    term,
    classes,
    // class,
    SensorialActivity,
  } = req.body; // Assuming the request body contains the Biology data as an array of test and exam objects

  // const modifyClass = class.replace(/\s+/g, "-");
  // Calculate the total score for each entry in the Biology array
  const NumeracyresultsWithTotal = Numeracy.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const LiteracyresultWithTotal = Literacy.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const ColouringresultsWithTotal = Colouring.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const HealthHabitresultsWithTotal = HealthHabit.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const PreScienceresultsWithTotal = PreScience.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const PracticalLiferesultsWithTotal = PracticalLife.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const RhymesresultsWithTotal = Rhymes.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const SensorialActivityresultsWithTotal = SensorialActivity.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));

  // const grandTotal = English.totalScore + Mathematics.totalScore;

  try {
    const ResultAlreadyExits = await PreNurseryResult.findOne({
      userId,
      year,
      term,
      classes,
    });

    if (ResultAlreadyExits) {
      return res.status(404).json({ message: "User Result already Exits" });
    }

    // Create a new result document in the database with the Biology array containing total scores
    const newResult = new PreNurseryResult({
      Numeracy: NumeracyresultsWithTotal,
      Literacy: LiteracyresultWithTotal,
      Colouring: ColouringresultsWithTotal,
      HealthHabit: HealthHabitresultsWithTotal,
      Rhymes: RhymesresultsWithTotal,
      PreScience: PreScienceresultsWithTotal,
      SensorialActivity: SensorialActivityresultsWithTotal,
      PracticalLife: PracticalLiferesultsWithTotal,
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
      $push: { prenurseryresult: newResult._id },
    });
    return res.status(201).json(newResult);
  } catch (error) {
    return res.status(500).json({ error: "Failed to save the result." });
  }
});
router.get("/", async (req, res) => {
  try {
    const prenurseryresults = await PreNurseryResult.find({})
      .sort({ createdAt: -1 })
      .populate("user", [
        "firstName",
        "lastName",
        "passportPhoto",
        "schoolRegNumber",
      ]);

    res.json(prenurseryresults);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const prenurseryresult = await PreNurseryResult.findById(
      req.params.id
    ).populate("user", [
      "firstName",
      "lastName",
      "passportPhoto",
      "schoolRegNumber",
    ]);
    res.status(200).json(prenurseryresult);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/results/:user/:year/:term/", async (req, res) => {
  try {
    const { user, year, term } = req.params;

    // Use the parameters to query the database
    const prenurseryresult = await PreNurseryResult.findOne({
      user,
      year,

      term,
    }).populate("user", [
      "firstName",
      "lastName",
      "passportPhoto",
      "schoolRegNumber",
    ]);

    if (!prenurseryresult) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Return the result as JSON
    res.json(prenurseryresult);
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
