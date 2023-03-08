const express = require("express");
const urlRoute = require("./url");

const router = express.Router();

router.use("/", urlRoute);

module.exports = router;
