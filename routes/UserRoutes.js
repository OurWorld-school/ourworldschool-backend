const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.status(200).json({ message: "This user has been deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/update/:id", async (req, res) => {
  // const { image } = req.body;
  try {
    const user = await User.findById(req.params.id);
    user.currentClass = req.body.currentClass || user.currentClass;
    user.firstName = req.body.firstName || user.firstName;

    user.lastName = req.body.lastName || useer.lastrName;
    user.email = req.body.email || user.email;
    user.schoolRegNumber = req.body.schoolRegNumber || user.schoolRegNumber;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.contactAdress = req.body.contactAdress || user.contactAdress;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      currentClass: updatedUser.currentClass,

      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      schoolRegNumber: updatedUser.schoolRegNumber,
      contactAdress: updatedUser.contactAdress,
    });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/update/isAdmin/:id", async (req, res) => {
  // const { image } = req.body;
  try {
    const user = await User.findById(req.params.id);

    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();
    // Delete the temporary file
    // fs.unlinkSync(image);
    res.status(200).json({
      _id: updatedUser._id,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/update/changeUserRole/:id", async (req, res) => {
  // const { image } = req.body;
  try {
    const user = await User.findById(req.params.id);

    user.roles = req.body.roles || user.roles;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      roles: updatedUser.roles,
    });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/update/deactivateRole/:id", async (req, res) => {
  // const { image } = req.body;
  try {
    const user = await User.findById(req.params.id);

    user.deactivateUserRole =
      req.body.deactivateUserRole || user.deactivateUserRole;

    const updatedUser = await user.save();
    // Delete the temporary file
    // fs.unlinkSync(image);
    res.status(200).json({
      _id: updatedUser._id,
      deactivateUserRole: updatedUser.deactivateUserRole,
    });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/update/scratchcard/:id", async (req, res) => {
  const { ScratchCard } = req.body;
  const scratchLimit = ScratchCard.map((item) => ({
    ScratchCardPin: item.ScratchCardPin,
    ScratchCardPassword: item.ScratchCardPassword,
  }));
  try {
    const user = await User.findById(req.params.id);
    if (ScratchCard.usageCount >= 5) {
      ScratchCard.isValid = false;
      await ScratchCard.save();
      return res.status(403).json({
        error:
          "This scratch card has been used 5 times and is no longer valid.",
      });
    }

    // ScratchCard.usageCount++;
    user.ScratchCard = scratchLimit || user.ScratchCard;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      ScratchCard: updatedUser.ScratchCard,
    });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
module.exports = router;
