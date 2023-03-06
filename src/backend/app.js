const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const route = require("./routes/index");

const app = express();
const PORT = process.envPORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Main route for the app
app.use("/", route);
app.use(express.json());

// mongoose connection config
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`URL shortener microservice running on port ${PORT}`);
});
