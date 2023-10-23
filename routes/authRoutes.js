const router = require("express").Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { default: generateToken } = require("../Utils/generateToken");
const imagekit = require("../Utils/Imagekit");

//REGISTER
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "djnchrys@gmail.com",
    pass: "mictdtqklnuerfkg",
  },
});
router.post("/registers", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // const existingUser = await User.findOne({ email });

    // if (existingUser) {
    //   return res.status(409).json({ error: "User already exists." });
    // }
    //create new user
    const result = await imagekit.upload({
      file: req.body.passportPhoto,
      fileName: `${req.body.firstName}-${req.body.lastName}.jpg`,
      // width:300,
      // crop:"scale"
    });
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      roles: req.body.roles,
      schoolRegNumber: req.body.schoolRegNumber,
      phoneNumber: req.body.phoneNumber,
      passportPhoto: result.url,
      contactAdress: req.body.contactAdress,
      password: hashedPassword,
    });
    ////nodemailer
    const mailOptions = {
      from: "ourworldintschool1@gmail.com",
      to: req.body.email,
      subject: "Registration Successful",
      html: `<p>Hello ${req.body.firstName},</p>
      <p>Thank you for registering with Our World International Nursery & Primary Shool e-portal. Your account has been successfully created.</p><p>Click <a href="https://example.com/confirm-email">here</a> to vsiti return to the site</p>`,
      //   text: "Congratulations, your registration was successful!",
    };

    //save user and respond
    const user = await newUser.save();
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    res.status(200).json({
      // token: generateToken(user._id),
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      email: user.email,
      phoneNumber: user.phoneNumber,
      passportPhoto: user.passportPhoto,
      contactAdress: user.contactAdress,
      isAdmin: user.isAdmin,
      schoolRegNumber: user.schoolRegNumber,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json({
      // token: generateToken(user._id),
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      email: user.email,
      phoneNumber: user.phoneNumber,
      passportPhoto: user.passportPhoto,
      contactAdress: user.contactAdress,
      isAdmin: user.isAdmin,
      schoolRegNumber: user.schoolRegNumber,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//Forgotten password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    // 1. Check if the user with the given email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    ////nodemailer
    const mailOptions = {
      from: "djnchrys@gmail.com",
      to: req.body.email,
      subject: "Registration Successful",
      html: `<p>Hello ${req.body.user.firstName},</p>
      <p>You are about to reset Your account password.</p><p>Click <a href="http://your-app-url/reset-password/${user.token}">here</a> to confirm your password reset.</p>`,
      //   text: "Congratulations, your registration was successful!",
    };
    // Generate a unique token and save it in the user document
    const token = generateToken();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    // Send the password reset email
    const resetUrl = `http://your-app-url/reset-password/${token}`;
    sendPasswordResetEmail(email, resetUrl);

    res.json({ message: "Password reset instructions sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  try {
    // Find the user with the provided token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Render the password reset form
    res.render("reset-password", { token });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Forgotten password
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;
  try {
    // Find the user with the provided token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    const mailOptions = {
      from: "djnchrys@gmail.com",
      to: req.body.email,
      subject: "Registration Successful",
      html: `<p>Hello ${req.body.user.firstName},</p>
  <p>Your password has been reset sucessfully. Thanks</p>`,
      //   text: "Congratulations, your registration was successful!",
    };
    // Update the user's password and clear the reset token fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
///

module.exports = router;
