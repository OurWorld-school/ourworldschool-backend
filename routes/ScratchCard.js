const ResultScratchCard = require("../models/ResultScratchCard");
const bcrypt = require("bcrypt");
const router = require("express").Router();
router.post("/", async (req, res) => {
  try {
    const { user, pin, serialNo } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(pin, salt);
    // Check if the user has used this pin and password 5 times
    const card = await ResultScratchCard.findOne({ user, pin, serialNo });
    if (card && card.usageCount >= 5) {
      return res
        .status(400)
        .json({ error: "This card has already been used 5 times." });
    }

    // If not, create a new scratch card entry or update the uses count
    if (card) {
      card.usageCount++;
      await card.save();
    } else {
      await ResultScratchCard.create({ user, hashedPin, serialNo });
    }

    res.status(200).json({ message: "Scratch card posted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});
router.post("/card", async (req, res) => {
  try {
    // function generateSerialNumber() {
    //   const uniqueNumber = Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    //   return `PROD-${uniqueNumber}`;
    // }
    const { user, pin, serialNo } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(req.body.pin, salt);
    const newScratchCard = new ResultScratchCard({ user, hashedPin, serialNo });
    await newScratchCard.save();
    res.status(400).json(newScratchCard);
    const scratchCard = await ResultScratchCard.findOne({
      user,
      pin,
      serialNo,
    });

    if (!scratchCard) {
      return res.status(404).json({ error: "Scratch card not found." });
    }

    if (scratchCard.usageCount >= 5) {
      return res
        .status(400)
        .json({ error: "This scratch card has been used 5 times already." });
    }

    // Update the timesUsed counter
    scratchCard.usageCount += 1;
    await scratchCard.save();

    res.json(scratchCard);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});
module.exports = router;
