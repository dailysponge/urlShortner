const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const route = require("./routes/index");

const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Main route for the app
app.use("/", route);
app.use(express.json());

// mongoose connection config
mongoose.connect(`${MONGODB_URI}`, {
  useNewUrlParser: true,
});

app.listen(BACKEND_PORT, () => {
  console.log(`URL shortener microservice running on port ${BACKEND_PORT}`);
});
