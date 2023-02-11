const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const cors = require("cors");
require("./config/passport");
require("./config/google-config");

dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secr3t",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use("/api/user", authRoute);
app.listen(3000, () => console.log("Server up and running"));
