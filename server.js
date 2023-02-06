const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { userNewUrlParser: true }, () =>
  console.log("connected to db!")
);
mongoose.set("strictQuery", true);

const authRoute = require("./routes/auth");

app.use("/api/user", authRoute);
app.listen(4000, () => console.log("Server up and running"));
