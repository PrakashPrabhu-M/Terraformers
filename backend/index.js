require("dotenv").config();

const express = require("express");
const app = express();

// configs
const { PORT, DB_URL } = require("./config");

// mongo db
const mongoose = require("mongoose");
mongoose
  .connect(DB_URL)
  .then(() => console.log(`DB connected`))
  .catch(() => console.log(`DB connection failed`));

// cors
const cors = require("cors");
app.use(cors());
app.options("*", cors());

// is password present in headers
const passwordVerifier = require("./middlewares/passwordVerifier");
app.use(passwordVerifier);

// access request body
app.use(express.json());

// routers
const routers = require("./routers");
app.use(routers);

app.listen(PORT, () => console.log("Listening on PORT", PORT));
