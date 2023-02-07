require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log("connected to db!")
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/user", authRoute);
app.listen(3000, () => console.log("Server up and running"));
