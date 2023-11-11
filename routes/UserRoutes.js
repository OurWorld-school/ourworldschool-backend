const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
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
  const { password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.currentClass = req.body.currentClass || user.currentClass;
    user.email = req.body.email || user.email;
    user.roles = req.body.roles || user.roles;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.schoolRegNumber = req.body.schoolRegNumber || user.schoolRegNumber;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.contactAdress = req.body.contactAdress || user.contactAdress;
    user.password = hash;
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      currentClass: updatedUser.currentClass,
      password: updatedUser.password,
      roles: updatedUser.roles,
      isAdmin: updatedUser.isAdmin,
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
router.put("/update-password/:userId", async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hash;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put("/currentclasses/:userId", async (req, res) => {
  const { userId } = req.params;
  const { currentClass } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's current class
    user.currentClass = currentClass || user.currentClass;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put("/update/createpassword/:id", async (req, res) => {
  // const { image } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.findById(req.params.id);

    user.password =
      (await bcrypt.hash(req.body.password, salt)) || user.password;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      password: updatedUser.password,
    });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/update/isAdmin/:userId", async (req, res) => {
  const { userId } = req.params;
  const { isAdmin } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's current class
    user.isAdmin = isAdmin || user.isAdmin;
    await user.save();

    res.json({ message: "Admin updated successfully" });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/update/isAdminss/:userId", async (req, res) => {
  const { userId } = req.params;
  const { isAdmin } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's current class
    user.isAdmin = isAdmin || user.isAdmin;
    await user.save();

    res.json({ message: "Admin updated successfully" });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/update/changeUserRole/:userId", async (req, res) => {
  const { userId } = req.params;
  const { roles } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's current class
    user.roles = roles || user.roles;
    await user.save();

    res.json({ message: "Roles updated successfully" });
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

module.exports = router;
