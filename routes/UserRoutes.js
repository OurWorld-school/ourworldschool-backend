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

    user.firstName = req.body.firstName || mp3.firstName;

    user.lastName = req.body.lastName || mp3.lastrName;
    user.email = req.body.email || mp3.email;
    user.schoolRegNumber = req.body.schoolRegNumber || mp3.schoolRegNumber;
    user.phoneNumber = req.body.phoneNumber || mp3.phoneNumber;
    user.contactAdress = req.body.contactAdress || mp3.contactAdress;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
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

    user.isAdmin = req.body.isAdmin || mp3.isAdmin;

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

    user.roles = req.body.roles || mp3.roles;

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
      req.body.deactivateUserRole || mp3.deactivateUserRole;

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
module.exports = router;
