const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const mainRouter = require("./routes/index");
const morgan = require("morgan");
const passport = require("passport");
const CookieSession = require("cookie-session");
require("./utils/auth");



const app = express();

app.use(
  CookieSession({
    secret: "mysecret", // una clave secreta para la sesión
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
// session secret
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

app.use(mainRouter);
