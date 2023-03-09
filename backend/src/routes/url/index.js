const express = require("express");
const moment = require("moment");
const { Url } = require("../../utils");

const router = express.Router();

// Creater user
router.post("/", async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) throw new Error("Missing originalUrl parameter");

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

router.get("/", async (req, res) => {
  try {
    const { sortType } = req.query == "created" ? "createdAt" : "numberOfClicks";
    const [error, url] = await Url.findUrl({}, sortType);
    if (error) throw error;

    const response = {
      status: 200,
      timestamp: moment().format(),
      data: {
        url,
      },
    };
    res.json(response);
  } catch (error) {
    console.error("Error finding URL", error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const conditions = {};
    if (id) conditions.shortUrlId = id;
    console.log(conditions);
    const [error, url] = await Url.findUrl(conditions);
    if (error) throw error;
    console.log(url[0]);
    const response = {
      status: 200,
      timestamp: moment().format(),
      data: {
        url,
      },
    };
    let originalUrl = url[0].originalUrl.includes("http")
      ? url[0].originalUrl
      : `http://${url[0].originalUrl}`;
    res.redirect(originalUrl);
    // res.json(response);
  } catch (error) {
    console.error("Error finding URL", error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const conditions = {};
    if (id) conditions.shortUrlId = id;
    const [error, url] = await Url.findAndDeleteUrl(conditions);
    if (error) throw error;
    const response = {
      status: 200,
      timestamp: moment().format(),
      data: {
        url,
      },
    };
    res.json(response);
  } catch (error) {
    console.error("Error finding URL", error);
    res.status(500).json(error);
  }
});

module.exports = router;
