const express = require("express");
const moment = require("moment");
const { Url } = require("../../utils");

const router = express.Router();

// Creater user
router.post("/", async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      throw new Error("Missing originalUrl parameter");
    }
    const [error, shortUrl] = await Url.createURL(originalUrl);
    if (error) throw error;

    const response = {
      status: 201,
      timestamp: moment().format(),
      data: {
        shortUrl,
      },
    };
    res.json(response);
  } catch (error) {
    console.error("Error creating URL", error);
    res.status(500).json(error);
  }
});

module.exports = router;
