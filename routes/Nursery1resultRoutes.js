const Nursery1result = require("../models/Nursery1result");
const User = require("../models/User");

const router = require("express").Router();
router.post("/", async (req, res) => {
  const userId = req.body.user;
  const {
    English,
    Mathematics,
    SocialHabit,
    HealthScience,
    BasicScience,
    AgricScience,
    Rhymes,
    Writing,
  } = req.body; // Assuming the request body contains the Biology data as an array of test and exam objects

  // Calculate the total score for each entry in the Biology array
  const EnglishresultsWithTotal = English.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
  }));
  const MathsresultsWithTotal = Mathematics.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
  }));
  const SocialHabitresultsWithTotal = SocialHabit.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
  }));
  const HealthScienceresultsWithTotal = HealthScience.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
  }));
  const BasicScienceresultsWithTotal = BasicScience.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
  }));
  const AgricresultsWithTotal = AgricScience.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
  }));
  const RhymesresultsWithTotal = Rhymes.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
  }));
  const WritingresultsWithTotal = Writing.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
  }));
  try {
    // Create a new result document in the database with the Biology array containing total scores
    const newResult = new Nursery1result({
      English: EnglishresultsWithTotal,
      Mathematics: MathsresultsWithTotal,
      BasicScience: BasicScienceresultsWithTotal,
      HealthScience: HealthScienceresultsWithTotal,
      Rhymes: RhymesresultsWithTotal,
      AgricScience: AgricresultsWithTotal,
      Writing: WritingresultsWithTotal,
      SocialHabit: SocialHabitresultsWithTotal,
      user: userId,
      class: req.body.class,
      year: req.body.year,
      term: req.body.term,
      schoolRegNumber: req.body.schoolRegNumber,
      TotalScore: req.body.TotalScore,
      TotalAverage: req.body.TotalAverage,
      Position: req.body.Position,
      remark: req.body.remark,
      Grade: req.body.Grade,
      Signature: req.body.Signature,
    });
    await newResult.save();
    // Update the user's document with the new result ID

    await User.findByIdAndUpdate(userId, {
      $push: { nursery1result: newResult._id },
    });
    return res.status(201).json(newResult);
  } catch (error) {
    return res.status(500).json({ error: "Failed to save the result." });
  }
});
router.get("/", async (req, res) => {
  try {
    const nursery1results = await Nursery1result.find({})
      .sort({ createdAt: -1 })
      .populate("user", [
        "firstName",
        "lastName",
        "passportPhoto",
        "schoolRegNumber",
      ]);

    res.json(nursery1results);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const nursery1result = await Nursery1result.findById(
      req.params.id
    ).populate("user", [
      "firstName",
      "lastName",
      "passportPhoto",
      "schoolRegNumber",
    ]);
    res.status(200).json(nursery1result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/results/:year/:term/", async (req, res) => {
  try {
    const { year, term } = req.params;

    // Use the parameters to query the database
    const nursery1result = await Nursery1result.findOne({
      //   schoolRegNumber,
      year,

      term,
    }).populate("user", [
      "firstName",
      "lastName",
      "passportPhoto",
      "schoolRegNumber",
    ]);

    if (!nursery1result) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Return the result as JSON
    res.json(nursery1result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
