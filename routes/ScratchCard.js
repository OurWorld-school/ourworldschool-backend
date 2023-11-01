const ResultScratchCard = require("../models/ResultScratchCard");

const router = require("express").Router();
router.post("/", async (req, res) => {
  const { user, pin, password } = req.body;

  try {
    const scratchCard = await ResultScratchCard.findOne({
      user,
      pin,
      password,
    });

    if (!scratchCard) {
      return res
        .status(404)
        .json({ message: "Scratch card not found or invalid credentials" });
    }

    if (scratchCard.usageCount >= 5) {
      return res
        .status(400)
        .json({ message: "This scratch card has been used 5 times already" });
    }

    scratchCard.usageCount++;
    await scratchCard.save();

    return res.status(200).json({ message: "Scratch card used successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
