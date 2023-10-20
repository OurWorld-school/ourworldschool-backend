const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const colors = require("colors");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoutes");

const connectDB = require("./config/db");
dotenv.config();

connectDB();
const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: "20mb" }));
app.use("/api/auth/", authRoute);

app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "build/index.html"))
);
app.listen(5000, console.log(`server running in port Port 5000`.bgYellow));
