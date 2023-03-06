const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.envPORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  res.send("Microservice is working!");
});

// Main route for the app
app.use(express.json());

// mongoose connection config
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`URL shortener microservice running on port ${PORT}`);
});
